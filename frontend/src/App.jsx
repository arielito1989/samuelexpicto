
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PictogramGrid from './components/PictogramGrid';
import SentenceDisplay from './components/SentenceDisplay';
import PictogramForm from './components/PictogramForm';
import './components/App.css';

function App() {
  const [sentence, setSentence] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [pictograms, setPictograms] = useState([]);
  const [pictogramToEdit, setPictogramToEdit] = useState(null);
  
  // Estados para la selección de voz
  const [availableVoices, setAvailableVoices] = useState([]);
  // Al iniciar, intenta leer la voz guardada en localStorage
  const [selectedVoice, setSelectedVoice] = useState(() => localStorage.getItem('selectedVoiceName') || '');

  // Efecto para guardar la voz seleccionada en localStorage
  useEffect(() => {
    if (selectedVoice) {
      localStorage.setItem('selectedVoiceName', selectedVoice);
    }
  }, [selectedVoice]);

  // Cargar pictogramas iniciales y voces del navegador
  useEffect(() => {
    const populateVoiceList = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length === 0) return; // Salir si las voces aún no están listas

      const spanishVoices = voices.filter(voice => voice.lang.startsWith('es'));
      setAvailableVoices(spanishVoices);

      // Si hay voces en español pero ninguna está seleccionada (ni siquiera desde localStorage),
      // selecciona la primera como defecto.
      if (spanishVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(spanishVoices[0].name);
      }
    };

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    fetchPictograms();
  }, []); // El array vacío asegura que se ejecute solo al montar el componente

  const fetchPictograms = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/pictograms');
      setPictograms(response.data);
    } catch (error) {
      console.error('Error al obtener los pictogramas:', error);
    }
  };

  const handlePictogramSelect = (pictogram) => {
    if (!editMode) {
        setSentence(prevSentence => [...prevSentence, pictogram.name]);
    }
  };

  const handleAddPictogram = async (pictogramData) => {
    try {
        await axios.post('http://localhost:3000/api/pictograms', pictogramData);
        fetchPictograms();
    } catch (error) {
        console.error('Error al añadir el pictograma:', error);
    }
  };

  const handleUpdatePictogram = async (pictogramData) => {
    if (!pictogramToEdit) return;
    try {
        await axios.put(`http://localhost:3000/api/pictograms/${pictogramToEdit.id}`, pictogramData);
        setPictogramToEdit(null);
        fetchPictograms();
    } catch (error) {
        console.error('Error al actualizar el pictograma:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/api/pictograms/${id}`);
        fetchPictograms();
    } catch (error) {
        console.error('Error al eliminar el pictograma:', error);
    }
  };

  const handleSave = (pictogramData) => {
    if (pictogramToEdit) {
      handleUpdatePictogram(pictogramData);
    } else {
      handleAddPictogram(pictogramData);
    }
  };

  const handleEditSelect = (pictogram) => {
    setPictogramToEdit(pictogram);
  };

  const handleCancelEdit = () => {
    setPictogramToEdit(null);
  };

  const speakSentence = () => {
    if ('speechSynthesis' in window && sentence.length > 0) {
      const utterance = new SpeechSynthesisUtterance(sentence.join(' '));
      const voice = availableVoices.find(v => v.name === selectedVoice);
      if (voice) {
        utterance.voice = voice;
      }
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    } else if (sentence.length === 0) {
        // No hacer nada
    } else {
      alert('Tu navegador no soporta la síntesis de voz.');
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-header">Comunicador Pictográfico</h1>
      <button className="primary-button" onClick={() => {
          setEditMode(!editMode);
          setPictogramToEdit(null);
      }}>
        {editMode ? 'Salir del Modo Edición' : 'Entrar al Modo Edición'}
      </button>
      <SentenceDisplay sentence={sentence} setSentence={setSentence} />
      <button className="primary-button" onClick={speakSentence} disabled={sentence.length === 0}>
        Leer Frase
      </button>
      {editMode && (
        <>
          <PictogramForm
              pictogramToEdit={pictogramToEdit}
              onSave={handleSave}
              onCancel={handleCancelEdit}
          />
          <div className="voice-selector-container">
            <label htmlFor="voice-select">Voz para la lectura:</label>
            <select id="voice-select" value={selectedVoice} onChange={e => setSelectedVoice(e.target.value)}>
              {availableVoices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {`${voice.name} (${voice.lang})`}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      <PictogramGrid
        pictograms={pictograms}
        onPictogramSelect={handlePictogramSelect}
        editMode={editMode}
        onEdit={handleEditSelect}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;

