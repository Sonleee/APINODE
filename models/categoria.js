const mongoose = require('mongoose');
const CategoriaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String
});
module.exports = mongoose.model('Categoria', CategoriaSchema);