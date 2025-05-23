const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Produto = require('../models/produto');
const Cliente = require('../models/cliente');
const Venda = require('../models/venda');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: 'E-mail já registrado' });
    }
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = new Usuario({ nome, email, senha: senhaHash });
    await novoUsuario.save();
    res.status(201).json({ mensagem: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ mensagem: 'Credenciais inválidas' });
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(400).json({ mensagem: 'Credenciais inválidas' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};



exports.criarCliente = async (req, res) => {
  try {
    const novoCliente = new Cliente(req.body);
    const clienteSalvo = await novoCliente.save();
    res.status(201).json(clienteSalvo);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};



exports.criarProduto = async (req, res) => {
  try {
    const novoProduto = new Produto(req.body);
    const produtoSalvo = await novoProduto.save();
    res.status(201).json(produtoSalvo);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};



exports.criarCategoria = async (req, res) => {
  try {
    const novaCategoria = new Categoria(req.body);
    const categoriaSalva = await novaCategoria.save();
    res.status(201).json(categoriaSalva);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};



exports.criarVenda = async (req, res) => {
  try {
    const { clienteId, produtos, descricao } = req.body;

    // Cria nova venda com os dados recebidos
    const novaVenda = new Venda({
      clienteId,
      produtos,
      descricao
    });

    const vendaSalva = await novaVenda.save();

    // Popula os dados do cliente e produtos (opcional para retorno mais detalhado)
    await vendaSalva.populate('clienteId').populate('produtos.produtoId');

    res.status(201).json(vendaSalva);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};
