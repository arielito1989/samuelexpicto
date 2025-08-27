const express = require('express');
const cors = require('cors');
const pictogramRoutes = require('./routes/pictogramRoutes');
const phraseRoutes = require('./routes/phraseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
const corsOptions = {
  origin: ['http://localhost:5173', 'https://samuelexpicto.vercel.app'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Servir archivos estáticos
app.use('/public', express.static('public'));

// Rutas
app.get('/', (req, res) => {
  res.send('¡El servidor del comunicador pictográfico está en marcha!');
});

app.use('/api/pictograms', pictogramRoutes);
app.use('/api/phrases', phraseRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
