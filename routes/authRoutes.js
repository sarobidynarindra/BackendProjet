// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { login } = require('../controller/AuthController');
const { loginAdmin} = require('../controller/AdminController');

// Route pour la connexion
router.post('/login', login);
router.post('/loginAdmin',loginAdmin);
module.exports = router;
