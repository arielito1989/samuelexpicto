import axios from 'axios';

// Crea una instancia de axios que usará la URL base del entorno
// o volverá a localhost:3000 si la variable de entorno no está definida.
const apiClient = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api'
});

export default apiClient;
