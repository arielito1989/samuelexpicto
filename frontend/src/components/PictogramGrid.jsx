import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import './PictogramGrid.css';
import SkeletonCard from './SkeletonCard'; // Importar el componente skeleton

const PictogramGrid = ({ pictograms, onPictogramSelect, editMode, onEdit, onDelete, isLoading }) => {
  return (
    <div className="pictogram-grid">
      {isLoading 
        ? (
          // Si está cargando, muestra 8 skeletons
          Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
        ) 
        : (
          // Si no, muestra los pictogramas
          pictograms.map((pictogram) => (
            <div key={pictogram.id} className="pictogram-card" onClick={() => onPictogramSelect(pictogram)}>
              <img src={pictogram.imageUrl} alt={pictogram.name} />
              <p>{pictogram.name}</p>
              {editMode && (
                <div className="edit-buttons">
                  <button className="icon-button edit-button" onClick={(e) => {
                    e.stopPropagation();
                    onEdit(pictogram);
                  }}>
                    <FaPencilAlt />
                  </button>
                  <button className="icon-button delete-button" onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event
                    onDelete(pictogram.id);
                  }}>
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          ))
        )
      }
    </div>
  );
};

export default PictogramGrid;
