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
      // Limpiar el formulario si no estamos editando
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">URL de la Imagen:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">{isEditing ? 'Guardar Cambios' : 'Añadir Pictograma'}</button>
        {isEditing && <button type="button" onClick={onCancel}>Cancelar</button>}
      </form>
    </div>
  );
};

export default PictogramForm;
