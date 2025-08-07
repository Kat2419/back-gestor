const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const transactionRoutes = require('./backend/routes/Transaction');
const userRoutes = require('./backend/routes/user'); 

const app = express();
app.use(cors());
app.use(express.json());

// Content-Type middleware
app.use((req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    if (!req.is('application/json')) {
      return res.status(415).json({ error: 'El Content-Type debe ser application/json' });
    }
  }
  next();
});

// Rutas de usuario y transacciones
app.use('/api/user', userRoutes); 
app.use('/api/transactions', transactionRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(process.env.PORT || 4000, () => {
      console.log('Servidor en puerto', process.env.PORT || 4000);
    });
  })
  .catch(err => console.error('❌ Error al conectar:', err));
