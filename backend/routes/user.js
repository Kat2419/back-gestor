const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ error: 'El usuario ya existe' });
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Usuario creado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });
  res.json({ message: 'Login correcto', username });
});

module.exports = router;
