import React from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa'; // Iconos para borrar
import './SentenceDisplay.css';

const SentenceDisplay = ({ sentence, setSentence }) => {

  const handleRemoveWord = (indexToRemove) => {
    setSentence(prevSentence => prevSentence.filter((_, index) => index !== indexToRemove));
  };

  const handleClearSentence = () => {
    setSentence([]);
  };

  return (
    <div className="sentence-display-container">
      {sentence.length > 0 ? (
        <>
          {sentence.map((word, index) => (
            <div key={index} className="sentence-chip">
              <span>{word}</span>
              <button className="remove-chip-button" onClick={() => handleRemoveWord(index)}>
                <FaTimes />
              </button>
            </div>
          ))}
          <button className="clear-sentence-button" onClick={handleClearSentence}>
            <FaTrash />
          </button>
        </>
      ) : (
        <span className="placeholder-text">Selecciona pictogramas para formar una frase...</span>
      )}
    </div>
  );
};

export default SentenceDisplay;
