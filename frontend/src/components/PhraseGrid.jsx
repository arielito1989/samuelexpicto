import React, { useState, useEffect } from 'react';
import apiClient from '../api';
import './PhraseGrid.css';
import PhraseForm from './PhraseForm'; // Importar el nuevo formulario

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
      const response = await apiClient.get(`/phrases?_=${new Date().getTime()}`);
      setPhrases(response.data);
    } catch (error) {
      console.error('Error al obtener las frases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (phraseData) => {
    if (phraseToEdit) {
      // Lógica de actualización
      try {
        await apiClient.put(`/phrases/${phraseToEdit.id}`, phraseData);
        setShowForm(false);
        setPhraseToEdit(null);
        fetchPhrases();
      } catch (error) {
        console.error('Error al actualizar la frase:', error);
      }
    } else {
      // Lógica de creación
      try {
        await apiClient.post('/phrases', phraseData);
        setShowForm(false);
        fetchPhrases();
      } catch (error) {
        console.error('Error al guardar la frase:', error);
      }
    }
  };

  const handleEditSelect = (phrase) => {
    setPhraseToEdit(phrase);
    setShowForm(true);
  };

  const handleDeletePhrase = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta frase?')) {
      try {
        await apiClient.delete(`/phrases/${id}`);
        fetchPhrases(); // Recargar las frases
      } catch (error) {
        console.error('Error al eliminar la frase:', error);
      }
    }
  };

  const speakPhrase = (phrase) => {
    if (editMode) return; // No hablar en modo edición

    if (phrase.audioUrl) {
      const audio = new Audio(phrase.audioUrl);
      audio.play();
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
