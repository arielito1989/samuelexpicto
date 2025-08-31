import React, { useState, useEffect } from 'react';
import localApiClient from '../api'; // Changed apiClient to localApiClient
import './PhraseGrid.css';
import PhraseForm from './PhraseForm';

const PhraseGrid = ({ editMode }) => {
  const [phrases, setPhrases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [phraseToEdit, setPhraseToEdit] = useState(null);

  useEffect(() => {
    fetchPhrases();
  }, []);

  const fetchPhrases = async () => {
    setIsLoading(true);
    try {
      // Changed to use localApiClient
      const fetchedPhrases = await localApiClient.phrases.getAll();
      setPhrases(fetchedPhrases);
    } catch (error) {
      console.error('Error al obtener las frases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (phraseData) => {
    try {
      if (phraseToEdit) {
        // Changed to use localApiClient
        await localApiClient.phrases.update(phraseToEdit.id, phraseData);
      } else {
        // Changed to use localApiClient
        await localApiClient.phrases.create(phraseData);
      }
      setShowForm(false);
      setPhraseToEdit(null);
      fetchPhrases();
    } catch (error) {
      console.error('Error al guardar la frase:', error);
    }
  };

  const handleEditSelect = (phrase) => {
    setPhraseToEdit(phrase);
    setShowForm(true);
  };

  const handleDeletePhrase = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta frase?')) {
      try {
        // Changed to use localApiClient
        await localApiClient.phrases.delete(id);
        fetchPhrases(); // Recargar las frases
      } catch (error) {
        console.error('Error al eliminar la frase:', error);
      }
    }
  };

  const speakPhrase = async (phrase) => {
    if (editMode) return; // No hablar en modo edición

    if (phrase.audioUrl) {
      try {
        const playableUrl = await localApiClient.files.readAudio(phrase.audioUrl);
        if (playableUrl) {
          const audio = new Audio(playableUrl);
          audio.play();
        } else {
          console.error('Could not read audio file');
        }
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    } else if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(phrase.fullSentence);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Tu navegador no soporta la síntesis de voz.');
    }
  };

  return (
    <div>
      {editMode && (
        <div className="add-phrase-container">
          <button className="primary-button" onClick={() => { setPhraseToEdit(null); setShowForm(!showForm); }}>
            {showForm && !phraseToEdit ? 'Cancelar' : 'Añadir Nueva Frase'}
          </button>
        </div>
      )}
      {showForm && editMode && (
        <PhraseForm 
          onSave={handleSave} 
          onCancel={() => { setShowForm(false); setPhraseToEdit(null); }}
          phraseToEdit={phraseToEdit}
        />
      )}
      <div className="phrase-grid">
        {isLoading ? (
          <p>Cargando frases...</p>
        ) : (
          phrases.map(phrase => (
            <div key={phrase.id} className="phrase-card" onClick={() => speakPhrase(phrase)}>
              <img src={phrase.imageUrl} alt={phrase.title} />
              <p>{phrase.title}</p>
              {editMode && (
                <div className="edit-buttons">
                  <button className="icon-button edit-button" onClick={(e) => { e.stopPropagation(); handleEditSelect(phrase); }}>✏️</button>
                  <button className="icon-button delete-button" onClick={(e) => { e.stopPropagation(); handleDeletePhrase(phrase.id); }}>🗑️</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PhraseGrid;
