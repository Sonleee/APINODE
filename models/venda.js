const mongoose = require('mongoose');
const VendaSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  produtos: [{
    produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
    quantidade: Number
  }],
  descricao: String,
  data: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Venda', VendaSchema);