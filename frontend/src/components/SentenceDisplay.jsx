import React from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './SentenceDisplay.css';

const SentenceDisplay = ({ sentence, setSentence, onDragEnd }) => {

  const handleRemoveWord = (indexToRemove) => {
    setSentence(prevSentence => prevSentence.filter((_, index) => index !== indexToRemove));
  };

  const handleClearSentence = () => {
    setSentence([]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="sentence-display-container">
        {sentence.length > 0 ? (
          <>
            <Droppable droppableId="sentence" direction="horizontal">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="sentence-chips-wrapper">
                  {sentence.map((word, index) => (
                    <Draggable key={word.id} draggableId={word.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="sentence-chip"
                        >
                          <img src={word.imageUrl} alt={word.name} />
                          <span>{word.name}</span>
                          <button className="remove-chip-button" onClick={() => handleRemoveWord(index)}>
                            <FaTimes />
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <button className="clear-sentence-button" onClick={handleClearSentence}>
              <FaTrash />
            </button>
          </>
        ) : (
          <span className="placeholder-text">Selecciona pictogramas para formar una frase...</span>
        )}
      </div>
    </DragDropContext>
  );
};

export default SentenceDisplay;