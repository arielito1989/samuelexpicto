const express = require('express');
const cors = require('cors');
const pictogramRoutes = require('./routes/pictogramRoutes');
const phraseRoutes = require('./routes/phraseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('¡El servidor del comunicador pictográfico está en marcha!');
});

app.use('/api/pictograms', pictogramRoutes);
app.use('/api/phrases', phraseRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
