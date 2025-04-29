const express = require('express');
const router = express.Router();

// Ruta de prueba
router.get('/ping', (req, res) => {
  res.json({ message: 'pong!' });
});

// Ruta del chatbot AGUIBOT
router.post('/chatbot', (req, res) => {
  const { pregunta } = req.body;
  const texto = pregunta.toLowerCase();

  let respuesta = "Lo siento, no entendí la pregunta.";

  // Respuestas personalizadas (incluso las de sugerencias)
  if (texto.includes('reinscripcion')) {
    respuesta = "Las reinscripciones son en agosto.";
  } else if (texto.includes('beca')) {
    respuesta = "La beca será depositada en este mes de abril.";
  } else if (texto.includes('kardex')) {
    respuesta = "Puedes consultar tu kardex entrando al SII y seleccionando la opción en el menú lateral.";
  } else if (texto.includes('nip')) {
    respuesta = "Para recuperar tu NIP, debes acudir a la ventanilla de servicios escolares con una identificación oficial.";
  } else if (texto.includes('inscripción')) {
    respuesta = "El proceso de inscripción consta de 5 pasos: 1) Pago de cuota, 2) Selección de materias, 3) Generación de horario, 4) Validación, 5) Impresión de carga académica.";
  } else if (texto.includes('fechas')) {
    respuesta = "Las fechas importantes para este semestre son:\n- Inscripciones: 15-19 de agosto\n- Inicio de clases: 22 de agosto\n- Evaluaciones: 10-14 de octubre";
  }

  res.json({ respuesta });
});

module.exports = router;
