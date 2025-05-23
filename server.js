// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/rotas');
const categoriaRoutes = require('./routes/rotas');
const produtoRoutes = require('./routes/rotas');
const clienteRoutes = require('./routes/rotas');
const vendaRoutes = require('./routes/rotas');
const authMiddleware = require('./middlewares/autmiddleware');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas publicas
app.use('/api', authRoutes);
// Rotas protegidas
app.use('/categorias', authMiddleware, categoriaRoutes);
app.use('/produtos', authMiddleware, produtoRoutes);
app.use('/clientes', authMiddleware, clienteRoutes);
app.use('/vendas', authMiddleware, vendaRoutes);

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
})
.catch(err => console.error(err));