import React, { useState, useEffect } from 'react';
import apiClient from './api';
import PictogramGrid from './components/PictogramGrid';
import SentenceDisplay from './components/SentenceDisplay';
import PictogramForm from './components/PictogramForm';
import PhraseGrid from './components/PhraseGrid';
import './components/App.css';

// Objeto con los colores por defecto de la aplicación
const defaultTheme = {
  primary: '#007bff',
  surface: '#f8f9fa',
  background: '#ffffff',
  text: '#343a40'
};

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

  // Estado para el tema de colores, inicializado desde localStorage o con los valores por defecto
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('userTheme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  // Efecto para aplicar el tema de colores a las variables CSS y guardarlo
  useEffect(() => {
    // Aplicar los colores del estado del tema a las variables CSS en el elemento raíz
    document.documentElement.style.setProperty('--color-primary', theme.primary);
    document.documentElement.style.setProperty('--surface-color', theme.surface);
    document.documentElement.style.setProperty('--background-color', theme.background);
    document.documentElement.style.setProperty('--text-color', theme.text);
    
    // Guardar el tema actual en localStorage
    localStorage.setItem('userTheme', JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    if (selectedVoice) {
      localStorage.setItem('selectedVoiceName', selectedVoice);
    }
  }, [selectedVoice]);

  useEffect(() => {
    const populateVoiceList = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length === 0) return;
      const spanishVoices = voices.filter(voice => voice.lang.startsWith('es'));
      setAvailableVoices(spanishVoices);
      if (spanishVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(spanishVoices[0].name);
      }
    };

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    fetchPictograms();
  }, [selectedVoice]);

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
      setSentence(prevSentence => [...prevSentence, pictogram.name]);
    }
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
          <SentenceDisplay sentence={sentence} setSentence={setSentence} />
          <button className="primary-button" onClick={speakSentence} disabled={sentence.length === 0}>
            Leer Frase
          </button>
        </>
      )}

      {editMode && (
        <>
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

          <div className="theme-editor-container">
            <h4>Personalizar Colores</h4>
            <div className="color-picker-group">
              <label>Primario:</label>
              <input type="color" value={theme.primary} onChange={e => setTheme({...theme, primary: e.target.value})} />
            </div>
            <div className="color-picker-group">
              <label>Superficie:</label>
              <input type="color" value={theme.surface} onChange={e => setTheme({...theme, surface: e.target.value})} />
            </div>
            <div className="color-picker-group">
              <label>Fondo:</label>
              <input type="color" value={theme.background} onChange={e => setTheme({...theme, background: e.target.value})} />
            </div>
            <div className="color-picker-group">
              <label>Texto:</label>
              <input type="color" value={theme.text} onChange={e => setTheme({...theme, text: e.target.value})} />
            </div>
          </div>
        </>
      )}

      {activeTab === 'create' && !editMode && (
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

      {editMode && (
         <PictogramGrid
          pictograms={filteredPictograms}
          onPictogramSelect={handlePictogramSelect}
          editMode={editMode}
          onEdit={handleEditSelect}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;