const mongoose = require('mongoose');
const ProdutoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  preco: Number,
  categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }
});
module.exports = mongoose.model('Produto', ProdutoSchema);