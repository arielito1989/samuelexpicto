import React, { useState, useEffect } from 'react';
import apiClient from '../api';
import './PhraseForm.css';

const PhraseForm = ({ onSave, onCancel, phraseToEdit }) => {
  const [title, setTitle] = useState('');
  const [phrase, setPhrase] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pictograms, setPictograms] = useState([]);

  useEffect(() => {
    const fetchPictograms = async () => {
      try {
        const response = await apiClient.get('/pictograms');
        setPictograms(response.data);
        if (response.data.length > 0 && !phraseToEdit) {
          setImageUrl(response.data[0].imageUrl);
        }
      } catch (error) {
        console.error('Error fetching pictograms:', error);
      }
    };
    fetchPictograms();
  }, [phraseToEdit]);

  useEffect(() => {
    if (phraseToEdit) {
      setTitle(phraseToEdit.title);
      setPhrase(phraseToEdit.fullSentence); // Usar fullSentence
      setImageUrl(phraseToEdit.imageUrl);
    } else {
      setTitle('');
      setPhrase('');
      setImageUrl(pictograms.length > 0 ? pictograms[0].imageUrl : '');
    }
  }, [phraseToEdit, pictograms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !phrase || !imageUrl) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    onSave({ title, phrase, imageUrl });
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
      <div className="form-actions">
        <button type="submit" className="primary-button">{phraseToEdit ? 'Actualizar Frase' : 'Guardar Frase'}</button>
        <button type="button" className="secondary-button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default PhraseForm;
