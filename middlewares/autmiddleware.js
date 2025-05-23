const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ mensagem: 'Acesso negado. Token não fornecido.' });

  try {
    const tokenLimpo = token.replace('Bearer ', '');
    const verificado = jwt.verify(tokenLimpo, process.env.JWT_SECRET);
    req.usuarioId = verificado.id;
    next();
  } catch (err) {
    res.status(400).json({ mensagem: 'Token inválido.' });
  }
};