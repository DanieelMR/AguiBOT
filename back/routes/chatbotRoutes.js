const express = require('express');
const router = express.Router();
const { responderPregunta } = require('../controllers/chatbotController');

// Ruta del chatbot AGUIBOT
router.post('/chatbot', responderPregunta);

module.exports = router;
