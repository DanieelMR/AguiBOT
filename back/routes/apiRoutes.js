const express = require('express');
const router = express.Router();

// Ruta de prueba
router.get('/ping', (req, res) => {
  res.json({ message: 'pong!' });
});

// Ruta del chatbot AGUIBOT
router.post('/chatbot', (req, res) => {
  const { pregunta } = req.body;

  let respuesta = "Lo siento, no entendí la pregunta.";

  if (pregunta.toLowerCase().includes('reinscripcion')) {
    respuesta = "Las reinscripciones son en agosto.";
  } else if (pregunta.toLowerCase().includes('beca')) {
    respuesta = "La beca sera depositada en este mes de abril";
  } else if (pregunta.toLowerCase().includes('kardex')) {
    respuesta = "Puedes consultar tu kardex entrando al SII y seleccionando la opción en el menú lateral.";
  }

  res.json({ respuesta });
});

module.exports = router;
