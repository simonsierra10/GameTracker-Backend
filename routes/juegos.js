// routes/juegos.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Juego = require('../models/Juego');

console.log(' Archivo routes/juegos.js cargado correctamente');

// Obtener todos los juegos
router.get('/', async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (error) {
    console.error('Error al obtener los juegos:', error);
    res.status(500).json({ mensaje: 'Error al obtener los juegos' });
  }
});

// Obtener un juego por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }
  try {
    const juego = await Juego.findById(id);
    if (!juego) return res.status(404).json({ mensaje: 'Juego no encontrado' });
    res.json(juego);
  } catch (error) {
    console.error('Error al obtener el juego:', error);
    res.status(500).json({ mensaje: 'Error al obtener el juego' });
  }
});

// Crear un nuevo juego
router.post('/', async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    const juegoGuardado = await nuevoJuego.save();
    res.status(201).json(juegoGuardado);
  } catch (error) {
    console.error('Error al crear el juego:', error);
    res.status(400).json({ mensaje: 'Error al crear el juego' });
  }
});

// Actualizar un juego
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }
  try {
    const actualizado = await Juego.findByIdAndUpdate(id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: 'Juego no encontrado' });
    res.json(actualizado);
  } catch (error) {
    console.error('Error al actualizar el juego:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el juego' });
  }
});

// Eliminar un juego
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }
  try {
    await Juego.findByIdAndDelete(id);
    res.json({ mensaje: 'Juego eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el juego:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el juego' });
  }
});

module.exports = router;
