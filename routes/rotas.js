const express = require('express');
const router = express.Router();
const authController = require('../controllers/controller');
const Controller = require('../controllers/controller');

// rotas de autenticação de usuário
router.post('/register', authController.register);
router.post('/login', authController.login);

// rotas de categoria
router.post('/categoria', Controller.criarCategoria);
router.get('/categoria', Controller.listarCategorias);
router.get('/categoria:id', Controller.buscarCategoriaPorId);
router.put('/categoria:id', Controller.atualizarCategoria);
router.delete('/categoria:id', Controller.excluirCategoria);
// rotas de cliente
router.post('/cliente', Controller.criarCliente);
router.get('/cliente', Controller.listarClientes);
router.get('/cliente:id', Controller.buscarClientePorId);
router.put('/cliente:id', Controller.atualizarCliente);
router.delete('/cliente:id', Controller.excluirCliente);
// rotas de produto
router.post('/produto', Controller.criarProduto);
router.get('/produto', Controller.listarProdutos);
router.get('/produto:id', Controller.buscarProdutoPorId);
router.put('/produto:id', Controller.atualizarProduto);
router.delete('/produto:id', Controller.excluirProduto);
// rotas de vendas
router.post('/venda', Controller.criarVenda);
router.get('/venda', Controller.listarVendas);
router.get('/venda:id', Controller.buscarVendaPorId);
router.put('/venda:id', Controller.atualizarVenda);
router.delete('/venda:id', Controller.excluirVenda);

module.exports = router;