import React from 'react';
import './EditModeHome.css';

const EditModeHome = ({ setEditView, onExit }) => {
  return (
    <div className="edit-mode-home">
      <h2 className="edit-mode-title">Modo Editor</h2>
      <p className="edit-mode-subtitle">Selecciona la acción que deseas realizar</p>
      <div className="edit-options-container">
        <div className="edit-option-card" onClick={() => setEditView('add_choice')}>
          <h3>Agregar Contenido</h3>
          <p>Añadir nuevos pictogramas o frases rápidas.</p>
        </div>
        <div className="edit-option-card" onClick={() => setEditView('edit_pictograms')}>
          <h3>Editar / Eliminar Pictograma</h3>
          <p>Modificar o borrar pictogramas de construcción de frases.</p>
        </div>
        <div className="edit-option-card" onClick={() => setEditView('edit_phrases')}>
          <h3>Editar / Eliminar Frase Rápida</h3>
          <p>Modificar o borrar frases con audio personalizado.</p>
        </div>
      </div>
       <button onClick={onExit} className="exit-edit-mode-button">Salir del modo editor</button>
    </div>
  );
};

export default EditModeHome;
