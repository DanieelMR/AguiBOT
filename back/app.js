const express = require('express');
const path = require('path');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Servir frontend estático
app.use(express.static(path.join(__dirname, '../front')));

// Rutas de API (más adelante)
app.use('/api', require('./routes/apiRoutes'));

module.exports = app;
