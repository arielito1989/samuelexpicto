
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PictogramGrid from './components/PictogramGrid';
import SentenceDisplay from './components/SentenceDisplay';
import PictogramForm from './components/PictogramForm'; // Usar el nuevo formulario

function App() {
  const [sentence, setSentence] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [pictograms, setPictograms] = useState([]);
  const [pictogramToEdit, setPictogramToEdit] = useState(null); // Estado para la edición

  const fetchPictograms = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/pictograms');
      setPictograms(response.data);
    } catch (error) {
      console.error('Error al obtener los pictogramas:', error);
    }
  };

  useEffect(() => {
    fetchPictograms();
  }, []);

  const handlePictogramSelect = (pictogram) => {
    if (!editMode) {
        setSentence(prevSentence => [...prevSentence, pictogram.name]);
    }
  };

  // --- Manejadores CRUD ---
  const handleAddPictogram = async (pictogramData) => {
    try {
        await axios.post('http://localhost:3000/api/pictograms', pictogramData);
        fetchPictograms(); // Re-sincronizar con la base de datos
    } catch (error) {
        console.error('Error al añadir el pictograma:', error);
    }
  };

  const handleUpdatePictogram = async (pictogramData) => {
    if (!pictogramToEdit) return;
    try {
        await axios.put(`http://localhost:3000/api/pictograms/${pictogramToEdit.id}`, pictogramData);
        setPictogramToEdit(null);
        fetchPictograms(); // Re-sincronizar
    } catch (error) {
        console.error('Error al actualizar el pictograma:', error);
    }
  };

  // Corregido: Ahora llama al backend para eliminar
  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/api/pictograms/${id}`);
        fetchPictograms(); // Re-sincronizar
    } catch (error) {
        console.error('Error al eliminar el pictograma:', error);
    }
  };

  // --- Lógica del formulario y modo edición ---
  const handleSave = (pictogramData) => {
    if (pictogramToEdit) {
      handleUpdatePictogram(pictogramData);
    } else {
      handleAddPictogram(pictogramData);
    }
  };

  const handleEditSelect = (pictogram) => {
    setPictogramToEdit(pictogram);
  };

  const handleCancelEdit = () => {
    setPictogramToEdit(null);
  };

  const speakSentence = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(sentence.join(' '));
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Tu navegador no soporta la síntesis de voz.');
    }
  };

  const appStyle = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
  };

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <div style={appStyle}>
      <h1>Comunicador Pictográfico</h1>
      <button style={buttonStyle} onClick={() => {
          setEditMode(!editMode);
          setPictogramToEdit(null); // Limpiar edición al cambiar de modo
      }}>
        {editMode ? 'Salir del Modo Edición' : 'Entrar al Modo Edición'}
      </button>
      <SentenceDisplay sentence={sentence} />
      <button style={buttonStyle} onClick={speakSentence} disabled={sentence.length === 0}>
        Leer Frase
      </button>
      {editMode && (
        <PictogramForm
            pictogramToEdit={pictogramToEdit}
            onSave={handleSave}
            onCancel={handleCancelEdit}
        />
      )}
      <PictogramGrid
        pictograms={pictograms}
        onPictogramSelect={handlePictogramSelect}
        editMode={editMode}
        onEdit={handleEditSelect}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;

