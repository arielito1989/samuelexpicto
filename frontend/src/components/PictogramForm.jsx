import React, { useState, useEffect } from 'react';
import './PictogramForm.css';

const PictogramForm = ({ pictogramToEdit, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const isEditing = !!pictogramToEdit;

  useEffect(() => {
    if (isEditing) {
      setName(pictogramToEdit.name);
      setImageUrl(pictogramToEdit.imageUrl);
    } else {
      setName('');
      setImageUrl('');
    }
  }, [pictogramToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !imageUrl) {
      alert('Por favor, completa ambos campos.');
      return;
    }
    onSave({ name, imageUrl });
    // Limpiar formulario después de guardar
    if (!isEditing) {
      setName('');
      setImageUrl('');
    }
  };

  return (
    <div className="add-pictogram-form">
      <h3>{isEditing ? 'Editar Pictograma' : 'Añadir Nuevo Pictograma'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Jugar"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">URL de la Imagen (o Base64):</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="data:image/png;base64,..."
          />
        </div>
        <div className="form-buttons">
          {isEditing && <button type="button" onClick={onCancel} className="cancel-button">Cancelar</button>}
          <button type="submit" className="primary-button">{isEditing ? 'Guardar Cambios' : 'Añadir'}</button>
        </div>
      </form>
    </div>
  );
};

export default PictogramForm;