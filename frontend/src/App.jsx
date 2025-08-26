import React, { useState, useEffect } from 'react';
import apiClient from './api';
import PictogramGrid from './components/PictogramGrid';
import SentenceDisplay from './components/SentenceDisplay';
import PictogramForm from './components/PictogramForm';
import PhraseGrid from './components/PhraseGrid';
import { FaMoon, FaSun } from 'react-icons/fa'; // Iconos para el botón de tema
import './components/App.css';

function App() {
  const [sentence, setSentence] = useState([]);
  const [activeTab, setActiveTab] = useState('create');
  const [editMode, setEditMode] = useState(false);
  const [pictograms, setPictograms] = useState([]);
  const [pictogramToEdit, setPictogramToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(() => localStorage.getItem('selectedVoiceName') || '');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('isDarkMode') === 'true';
  });

  // Efecto para aplicar la clase del modo oscuro al body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    if (selectedVoice) {
      localStorage.setItem('selectedVoiceName', selectedVoice);
    }
  }, [selectedVoice]);

  useEffect(() => {
    fetchPictograms();
  }, []);

  useEffect(() => {
    const populateVoiceList = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return;

      const spanishVoices = voices.filter(voice => voice.lang.startsWith('es'));
      setAvailableVoices(spanishVoices);

      const storedVoice = localStorage.getItem('selectedVoiceName');
      const isStoredVoiceAvailable = spanishVoices.some(v => v.name === storedVoice);

      if (storedVoice && isStoredVoiceAvailable) {
        setSelectedVoice(storedVoice);
      } else if (spanishVoices.length > 0) {
        setSelectedVoice(spanishVoices[0].name);
      }
    };

    populateVoiceList();
    window.speechSynthesis.onvoiceschanged = populateVoiceList;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const fetchPictograms = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/pictograms');
      setPictograms(response.data);
    } catch (error) {
      console.error('Error al obtener los pictogramas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePictogramSelect = (pictogram) => {
    if (!editMode) {
      const newWord = {
        id: `word-${Date.now()}-${Math.random()}`,
        name: pictogram.name,
        imageUrl: pictogram.imageUrl
      };
      setSentence(prevSentence => [...prevSentence, newWord]);
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(sentence);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSentence(items);
  };

  const handleAddPictogram = async (pictogramData) => {
    try {
      await apiClient.post('/pictograms', pictogramData);
      fetchPictograms();
    } catch (error) {
      console.error('Error al añadir el pictograma:', error);
    }
  };

  const handleUpdatePictogram = async (pictogramData) => {
    if (!pictogramToEdit) return;
    try {
      await apiClient.put(`/pictograms/${pictogramToEdit.id}`, pictogramData);
      setPictogramToEdit(null);
      fetchPictograms();
    } catch (error) {
      console.error('Error al actualizar el pictograma:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/pictograms/${id}`);
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
      const utterance = new SpeechSynthesisUtterance(sentence.map(word => word.name).join(' '));
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

  const filteredPictograms = pictograms.filter(pictogram =>
    pictogram.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="app-header">Comunicador Pictográfico</h1>
      <button className="primary-button" onClick={() => { setEditMode(!editMode); setPictogramToEdit(null); }}>
        {editMode ? 'Salir del Modo Edición' : 'Entrar al Modo Edición'}
      </button>

      <div className="tabs-container">
        <button onClick={() => setActiveTab('create')} className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}>
          Crear Frase
        </button>
        <button onClick={() => setActiveTab('quick')} className={`tab-button ${activeTab === 'quick' ? 'active' : ''}`}>
          Frases Rápidas
        </button>
      </div>

      {activeTab === 'create' && (
        <>
          <SentenceDisplay sentence={sentence} setSentence={setSentence} onDragEnd={handleOnDragEnd} />
          <button className="primary-button" onClick={speakSentence} disabled={sentence.length === 0}>
            Leer Frase
          </button>
        </>
      )}

      {editMode && (
        <div className="settings-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar pictograma..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="primary-button" style={{marginTop: '20px'}}>
            {isDarkMode ? <FaSun /> : <FaMoon />} {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>
      )}

      {(editMode || activeTab === 'create') && (
        <PictogramGrid
          pictograms={filteredPictograms}
          onPictogramSelect={handlePictogramSelect}
          editMode={editMode}
          onEdit={handleEditSelect}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      )}

      {activeTab === 'quick' && (
        <PhraseGrid editMode={editMode} />
      )}
    </div>
  );
}

export default App;
