import React from 'react';

const SentenceDisplay = ({ sentence }) => {
  const displayStyle = {
    padding: '20px',
    margin: '20px',
    border: '2px solid #007bff',
    borderRadius: '8px',
    minHeight: '50px',
    textAlign: 'left',
    fontSize: '1.2em',
    backgroundColor: '#f8f9fa',
  };

  return (
    <div style={displayStyle}>
      {sentence.length > 0 ? sentence.join(' ') : 'Selecciona pictogramas para formar una frase...'}
    </div>
  );
};

export default SentenceDisplay;
