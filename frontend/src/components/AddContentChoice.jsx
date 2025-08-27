import React from 'react';
import './EditModeHome.css'; // Reutilizamos los estilos del menú principal

const AddContentChoice = ({ setEditView }) => {
  return (
    <div className="edit-mode-home">
      <h2 className="edit-mode-title">Agregar Contenido</h2>
      <p className="edit-mode-subtitle">¿Qué tipo de contenido deseas crear?</p>
      <div className="edit-options-container">
        <div className="edit-option-card" onClick={() => setEditView('pictogram_form')}>
          <h3>Pictograma Normal</h3>
          <p>Para construir frases palabra por palabra.</p>
        </div>
        <div className="edit-option-card" onClick={() => setEditView('phrase_form')}>
          <h3>Frase Rápida</h3>
          <p>Una frase completa con audio personalizado.</p>
        </div>
      </div>
      <button onClick={() => setEditView('home')} className="exit-edit-mode-button">Volver al Menú</button>
    </div>
  );
};

export default AddContentChoice;
