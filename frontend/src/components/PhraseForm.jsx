import React, { useState, useEffect, useRef } from 'react';
import localApiClient from '../api';
import './PhraseForm.css';

const PhraseForm = ({ onSave, onCancel, phraseToEdit }) => {
  const [title, setTitle] = useState('');
  const [phrase, setPhrase] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pictograms, setPictograms] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [playableAudioUrl, setPlayableAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [volume, setVolume] = useState(1);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState('');
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const audioContext = useRef(null);
  const analyser = useRef(null);
  const dataArray = useRef(null);
  const source = useRef(null);
  const rafId = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const getAudioDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputDevices = devices.filter(device => device.kind === 'audioinput');
      setAudioDevices(audioInputDevices);
      if (audioInputDevices.length > 0) {
        setSelectedAudioDevice(audioInputDevices[0].deviceId);
      }
    };
    getAudioDevices();
  }, []);

  useEffect(() => {
    const fetchPictograms = async () => {
      try {
        const fetchedPictograms = await localApiClient.pictograms.getAll();
        setPictograms(fetchedPictograms);
        if (fetchedPictograms.length > 0 && !phraseToEdit) {
          setImageUrl(fetchedPictograms[0].imageUrl);
        }
      } catch (error) {
        console.error('Error fetching pictograms:', error);
      }
    };
    fetchPictograms();
  }, [phraseToEdit]);

  useEffect(() => {
    const loadExistingAudio = async (filePath) => {
      const playableUrl = await localApiClient.files.readAudio(filePath);
      setPlayableAudioUrl(playableUrl);
    };

    if (phraseToEdit) {
      setTitle(phraseToEdit.title);
      setPhrase(phraseToEdit.fullSentence);
      setImageUrl(phraseToEdit.imageUrl);
      setAudioUrl(phraseToEdit.audioUrl);
      if (phraseToEdit.audioUrl) {
        loadExistingAudio(phraseToEdit.audioUrl);
      }
    } else {
      setTitle('');
      setPhrase('');
      setImageUrl(pictograms.length > 0 ? pictograms[0].imageUrl : '');
      setAudioUrl(null);
      setPlayableAudioUrl(null);
    }
    setRecordedAudio(null);
  }, [phraseToEdit, pictograms]);

  const visualize = () => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const draw = () => {
      rafId.current = requestAnimationFrame(draw);
      analyser.current.getByteTimeDomainData(dataArray.current);
      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
      canvasCtx.beginPath();
      const sliceWidth = canvas.width * 1.0 / analyser.current.frequencyBinCount;
      let x = 0;
      for (let i = 0; i < analyser.current.frequencyBinCount; i++) {
        const v = dataArray.current[i] / 128.0;
        const y = v * canvas.height / 2;
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };
    draw();
  };

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: selectedAudioDevice } });
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    analyser.current = audioContext.current.createAnalyser();
    source.current = audioContext.current.createMediaStreamSource(stream);
    source.current.connect(analyser.current);
    analyser.current.fftSize = 2048;
    const bufferLength = analyser.current.frequencyBinCount;
    dataArray.current = new Uint8Array(bufferLength);
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.onloadedmetadata = () => {
        setAudioDuration(audio.duration);
      };
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => {
        const base64data = reader.result;
        setRecordedAudio(base64data);
      };
      audioChunks.current = [];
      cancelAnimationFrame(rafId.current);
    };
    mediaRecorder.current.start();
    setIsRecording(true);
    visualize();
  };

  const handleStopRecording = () => {
    mediaRecorder.current.stop();
    setIsRecording(false);
  };

  const handlePlayAudio = (audio) => {
    if (audio) {
      const audioPlayer = new Audio(audio);
      audioPlayer.volume = volume;
      audioPlayer.play();
    }
  };

  const handleDeleteAudio = () => {
    setRecordedAudio(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !phrase || !imageUrl) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    let finalAudioUrl = audioUrl;

    if (recordedAudio) {
      const filePath = await localApiClient.files.saveAudio(recordedAudio);
      if (filePath) {
        finalAudioUrl = filePath;
      } else {
        console.error('Error saving audio file');
        alert('Hubo un error al guardar el audio. Por favor, inténtalo de nuevo.');
        return;
      }
    }

    onSave({ title, fullSentence: phrase, imageUrl, audioUrl: finalAudioUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="phrase-form">
      <h3>{phraseToEdit ? 'Actualizar Frase' : 'Crear Nueva Frase Rápida'}</h3>
      <div className="form-group">
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Quiero agua"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phrase">Frase a leer:</label>
        <input
          type="text"
          id="phrase"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          placeholder="Ej: Quiero tomar agua, por favor"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Imagen del pictograma:</label>
        <div className="pictogram-selector">
          {pictograms.map(p => (
            <img
              key={p.id}
              src={p.imageUrl}
              alt={p.name}
              className={`pictogram-option ${imageUrl === p.imageUrl ? 'selected' : ''}`}
              onClick={() => setImageUrl(p.imageUrl)}
            />
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Audio:</label>
        <div className="device-selector">
          <label htmlFor="audio-device">Dispositivo de audio:</label>
          <select id="audio-device" value={selectedAudioDevice} onChange={(e) => setSelectedAudioDevice(e.target.value)}>
            {audioDevices.map(device => (
              <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
            ))}
          </select>
        </div>
        <div className="audio-controls">
          <button type="button" onClick={handleStartRecording} disabled={isRecording}>Grabar</button>
          <button type="button" onClick={handleStopRecording} disabled={!isRecording}>Detener</button>
        </div>
        <canvas ref={canvasRef} className="visualizer" width="300" height="75"></canvas>
        {playableAudioUrl && !recordedAudio && (
          <div className="current-audio">
            <p>Audio actual:</p>
            <audio src={playableAudioUrl} controls controlsList="nodownload" />
            <button type="button" onClick={() => { setAudioUrl(null); setPlayableAudioUrl(null); }}>Quitar audio</button>
          </div>
        )}
        {recordedAudio && (
          <div className="recorded-audio">
            <p>Nuevo audio:</p>
            <audio src={recordedAudio} controls controlsList="nodownload" />
            <p>Duración: {audioDuration.toFixed(2)}s</p>
            <button type="button" onClick={() => handlePlayAudio(recordedAudio)}>Reproducir</button>
            <button type="button" onClick={handleDeleteAudio}>Eliminar</button>
          </div>
        )}
        {!playableAudioUrl && !recordedAudio && (
          <p>No hay audio para esta frase.</p>
        )}
        <div className="volume-control">
          <label htmlFor="volume">Volumen:</label>
          <input
            type="range"
            id="volume"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="primary-button">{phraseToEdit ? 'Actualizar Frase' : 'Guardar Frase'}</button>
        <button type="button" className="secondary-button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default PhraseForm;
