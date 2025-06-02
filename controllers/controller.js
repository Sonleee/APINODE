const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Produto = require('../models/produto');
const Cliente = require('../models/cliente');
const Venda = require('../models/venda');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuário
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

// Login de usuário
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

// Criar cliente
exports.criarCliente = async (req, res) => {
  try {
    const novoCliente = new Cliente(req.body);
    const clienteSalvo = await novoCliente.save();
    res.status(201).json(clienteSalvo);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Buscar todos os clientes
exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Buscar cliente por ID
exports.buscarClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Atualizar cliente
exports.atualizarCliente = async (req, res) => {
  try {
    const clienteAtualizado = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!clienteAtualizado) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    res.status(200).json(clienteAtualizado);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Excluir cliente
exports.excluirCliente = async (req, res) => {
  try {
    const clienteExcluido = await Cliente.findByIdAndDelete(req.params.id);

    if (!clienteExcluido) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    res.status(200).json({ mensagem: 'Cliente excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};


// Criar produto
exports.criarProduto = async (req, res) => {
  try {
    const novoProduto = new Produto(req.body);
    const produtoSalvo = await novoProduto.save();
    res.status(201).json(produtoSalvo);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Listar todos os produtos
exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Buscar produto por ID
exports.buscarProdutoPorId = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Atualizar produto
exports.atualizarProduto = async (req, res) => {
  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!produtoAtualizado) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Excluir produto
exports.excluirProduto = async (req, res) => {
  try {
    const produtoExcluido = await Produto.findByIdAndDelete(req.params.id);

    if (!produtoExcluido) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.status(200).json({ mensagem: 'Produto excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Criar categoria
exports.criarCategoria = async (req, res) => {
  try {
    const novaCategoria = new Categoria(req.body);
    const categoriaSalva = await novaCategoria.save();
    res.status(201).json(categoriaSalva);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Listar todas as categorias
exports.listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Buscar categoria por ID
exports.buscarCategoriaPorId = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Atualizar categoria
exports.atualizarCategoria = async (req, res) => {
  try {
    const categoriaAtualizada = await Categoria.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!categoriaAtualizada) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    res.status(200).json(categoriaAtualizada);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Excluir categoria
exports.excluirCategoria = async (req, res) => {
  try {
    const categoriaExcluida = await Categoria.findByIdAndDelete(req.params.id);

    if (!categoriaExcluida) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    res.status(200).json({ mensagem: 'Categoria excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};


// Criar venda
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
    await vendaSalva.populate([
      {path: 'clienteId'},
    {path: 'produtos.produtoId'}
  ]);

    res.status(201).json(vendaSalva);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Listar todas as vendas
exports.listarVendas = async (req, res) => {
  try {
    const vendas = await Venda.find()
      .populate('clienteId')
      .populate('produtos.produtoId');

    res.status(200).json(vendas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Buscar venda por ID
exports.buscarVendaPorId = async (req, res) => {
  try {
    const venda = await Venda.findById(req.params.id)
      .populate('clienteId')
      .populate('produtos.produtoId');

    if (!venda) {
      return res.status(404).json({ erro: 'Venda não encontrada' });
    }

    res.status(200).json(venda);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Atualizar venda
exports.atualizarVenda = async (req, res) => {
  try {
    const vendaAtualizada = await Venda.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .populate('clienteId')
    .populate('produtos.produtoId');

    if (!vendaAtualizada) {
      return res.status(404).json({ erro: 'Venda não encontrada' });
    }

    res.status(200).json(vendaAtualizada);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Excluir venda
exports.excluirVenda = async (req, res) => {
  try {
    const vendaExcluida = await Venda.findByIdAndDelete(req.params.id);

    if (!vendaExcluida) {
      return res.status(404).json({ erro: 'Venda não encontrada' });
    }

    res.status(200).json({ mensagem: 'Venda excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};