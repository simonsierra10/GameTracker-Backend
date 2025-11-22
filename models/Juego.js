const mongoose = require('mongoose');

const JuegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  portada: { type: String, required: true },
  puntuacion: { type: Number, required: true },
  horasJugadas: { type: Number, required: true },
  completado: { type: Boolean, default: false },
  reseñas: [
    {
      usuario: String,
      texto: String,
      fecha: { type: String, default: new Date().toISOString() }
    }
  ]
});

module.exports = mongoose.model('Juego', JuegoSchema);
