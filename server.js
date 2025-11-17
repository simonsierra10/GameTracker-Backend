// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' MongoDB conectado'))
  .catch(err => console.error(' Error de conexión:', err));

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send(' API GameTracker funcionando correctamente');
});

// Rutas principales
app.use('/api/juegos', require('./routes/juegos'));

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error(' Error interno:', err.stack);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Servidor corriendo en puerto ${PORT}`));
