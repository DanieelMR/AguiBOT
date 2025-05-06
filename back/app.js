const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

// Middleware para loguear solicitudes HTTP
app.use(morgan('dev'));

// Middleware para parsear JSON
app.use(express.json());

// Servir frontend estático
app.use(express.static(path.join(__dirname, '../front')));

// Rutas de API
const apiChatbot = require('./routes/chatbotRoutes');
app.use('/api', apiChatbot);

module.exports = app;
