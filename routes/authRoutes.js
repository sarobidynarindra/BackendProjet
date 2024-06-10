// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { login } = require('../controller/AuthController');

// Route pour la connexion
router.post('/login', login);

module.exports = router;
