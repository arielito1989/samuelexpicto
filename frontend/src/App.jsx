import React, { useState, useEffect } from 'react';
import apiClient from './api';

// Components
import PictogramGrid from './components/PictogramGrid';
import SentenceDisplay from './components/SentenceDisplay';
import PictogramForm from './components/PictogramForm';
import PhraseGrid from './components/PhraseGrid';
import PhraseForm from './components/PhraseForm';
import EditModeHome from './components/EditModeHome';
import AddContentChoice from './components/AddContentChoice';

// Styles and Icons
import { FaMoon, FaSun } from 'react-icons/fa';
import './components/App.css';

function App() {
  // --- STATE MANAGEMENT ---
  // App Core State
  const [sentence, setSentence] = useState([]);
  const [activeTab, setActiveTab] = useState('create');
  const [isLoading, setIsLoading] = useState(true);

  // Edit Mode State
  const [editMode, setEditMode] = useState(false);
  const [editView, setEditView] = useState('home'); // 'home', 'add_choice', 'edit_pictograms', 'edit_phrases', 'pictogram_form', 'phrase_form'

  // Data State
  const [pictograms, setPictograms] = useState([]);
  const [phrases, setPhrases] = useState([]);

  // Editing State
  const [pictogramToEdit, setPictogramToEdit] = useState(null);
  const [phraseToEdit, setPhraseToEdit] = useState(null);

  // Search and Settings State
  const [searchTerm, setSearchTerm] = useState('');
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(() => localStorage.getItem('selectedVoiceName') || '');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('isDarkMode') === 'true');

  // --- EFFECTS ---
  // Dark Mode Effect
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  // Voice Persistence Effect
  useEffect(() => {
    if (selectedVoice) {
      localStorage.setItem('selectedVoiceName', selectedVoice);
    }
  }, [selectedVoice]);

  // Initial Data Fetch
  useEffect(() => {
    fetchPictograms();
    fetchPhrases();
  }, []);

  // Voice Synthesis Effect
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
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  // --- API & DATA HANDLERS ---
  // Pictograms
  const fetchPictograms = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.pictograms.getAll();
      setPictograms(data);
    } catch (error) {
      console.error('Error al obtener los pictogramas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePictogramSave = async (pictogramData) => {
    try {
      if (pictogramToEdit) {
        await apiClient.pictograms.update(pictogramToEdit.id, pictogramData);
      } else {
        await apiClient.pictograms.create(pictogramData);
      }
      fetchPictograms();
      setPictogramToEdit(null);
      setEditView('edit_pictograms'); // Go back to the grid after saving
    } catch (error) {
      console.error(`Error al guardar el pictograma:`, error);
    }
  };

  const handlePictogramDelete = async (id) => {
    try {
      await apiClient.pictograms.delete(id);
      fetchPictograms();
    } catch (error) {
      console.error('Error al eliminar el pictograma:', error);
    }
  };

  const handlePictogramEditSelect = (pictogram) => {
    setPictogramToEdit(pictogram);
    setEditView('pictogram_form');
  };

  // Phrases
  const fetchPhrases = async () => {
    try {
      const data = await window.electronAPI.getPhrases();
      setPhrases(data || []);
    } catch (error) {
      console.error('Error al obtener las frases:', error);
    }
  };

  const handlePhraseSave = async (phraseData) => {
    try {
      if (phraseToEdit) {
        await window.electronAPI.updatePhrase(phraseToEdit.id, phraseData);
      } else {
        await window.electronAPI.createPhrase(phraseData);
      }
      fetchPhrases();
      setPhraseToEdit(null);
      setEditView('edit_phrases');
    } catch (error) {
      console.error(`Error al guardar la frase:`, error);
    }
  };

  const handlePhraseDelete = async (id) => {
    try {
      await window.electronAPI.deletePhrase(id);
      fetchPhrases();
    } catch (error) {
      console.error('Error al eliminar la frase:', error);
    }
  };

  const handlePhraseEditSelect = (phrase) => {
    setPhraseToEdit(phrase);
    setEditView('phrase_form');
  };


  // --- UI HANDLERS ---
  const handlePictogramSelect = (pictogram) => {
    const newWord = { id: `word-${Date.now()}`, name: pictogram.name, imageUrl: pictogram.imageUrl };
    setSentence(prevSentence => [...prevSentence, newWord]);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(sentence);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSentence(items);
  };

  const speakSentence = () => {
    if ('speechSynthesis' in window && sentence.length > 0) {
      const utterance = new SpeechSynthesisUtterance(sentence.map(word => word.name).join(' '));
      const voice = availableVoices.find(v => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  const enterEditMode = () => {
    setEditMode(true);
    setEditView('home');
    // Reset any lingering edit states
    setPictogramToEdit(null);
    setPhraseToEdit(null);
  };

  const exitEditMode = () => {
    setEditMode(false);
  };

  // --- RENDER LOGIC ---
  const filteredPictograms = pictograms.filter(p => p && p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredPhrases = phrases.filter(p => p && p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const renderEditMode = () => {
    // Add a container for styling edit mode views consistently
    return (
      <div className="edit-mode-container">
        {(() => {
          switch (editView) {
            case 'home':
              return <EditModeHome setEditView={setEditView} onExit={exitEditMode} />;
            case 'add_choice':
              return <AddContentChoice setEditView={setEditView} />;
            case 'edit_pictograms':
              return (
                <div className="edit-view-container">
                  <h2>Editar / Eliminar Pictogramas</h2>
                  <PictogramGrid
                    pictograms={filteredPictograms}
                    onPictogramSelect={() => {}}
                    editMode={true}
                    onEdit={handlePictogramEditSelect}
                    onDelete={handlePictogramDelete}
                    isLoading={isLoading}
                  />
                  <button onClick={() => setEditView('home')} className="primary-button">Volver al Menú</button>
                </div>
              );
            case 'edit_phrases':
              return (
                <div className="edit-view-container">
                  <h2>Editar / Eliminar Frases Rápidas</h2>
                  <PhraseGrid
                    phrases={filteredPhrases}
                    editMode={true}
                    onEdit={handlePhraseEditSelect}
                    onDelete={handlePhraseDelete}
                  />
                  <button onClick={() => setEditView('home')} className="primary-button">Volver al Menú</button>
                </div>
              );
            case 'pictogram_form':
              return (
                <div className="edit-view-container">
                  <h2>{pictogramToEdit ? 'Editar' : 'Agregar'} Pictograma</h2>
                  <PictogramForm
                    pictogramToEdit={pictogramToEdit}
                    onSave={handlePictogramSave}
                    onCancel={() => { setPictogramToEdit(null); setEditView('home'); }}
                  />
                </div>
              );
            case 'phrase_form':
              return (
                <div className="edit-view-container">
                  <h2>{phraseToEdit ? 'Editar' : 'Agregar'} Frase Rápida</h2>
                  <PhraseForm
                    phraseToEdit={phraseToEdit}
                    onSave={handlePhraseSave}
                    onCancel={() => { setPhraseToEdit(null); setEditView('home'); }}
                  />
                </div>
              );
            default:
              return <EditModeHome setEditView={setEditView} onExit={exitEditMode} />;
          }
        })()}
      </div>
    );
  };

  const renderAppMode = () => (
    <>
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
          <PictogramGrid
            pictograms={filteredPictograms}
            onPictogramSelect={handlePictogramSelect}
            editMode={false}
            isLoading={isLoading}
          />
        </>
      )}

      {activeTab === 'quick' && (
        <PhraseGrid phrases={phrases} editMode={false} />
      )}
    </>
  );

  return (
    <div className="app-container">
      <div className="app-header-controls">
        <h1 className="app-header">Comunicador Pictográfico</h1>
        <div className="header-buttons">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="primary-button">
                {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button className="primary-button" onClick={editMode ? exitEditMode : enterEditMode}>
                {editMode ? 'Salir del Modo Edición' : 'Entrar al Modo Edición'}
            </button>
        </div>
      </div>

      {editMode ? renderEditMode() : renderAppMode()}
    </div>
  );
}

export default App;
''
