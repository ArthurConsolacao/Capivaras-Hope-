const validarBody = (req, res, next) => {
  const { nome, descricao } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'O campo "nome" é obrigatório.' });
  }

  if (!descricao || descricao.trim() === "") {
    req.body.descricao = "Sem descrição";
  }

  next();
};

module.exports = {
  validarBody,
};
