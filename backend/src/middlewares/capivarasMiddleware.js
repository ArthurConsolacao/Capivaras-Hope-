const habitatsModel = require("../models/habitatsModel");

const validarBody = async (req, res, next) => {
  const { body } = req;

  const camposObrigatorios = [
    "nome",
    "idade",
    "peso",
    "status_saude",
    "comportamento",
    "dieta",
    "observacoes",
    "habitat_id",
  ];

  // Verifica se algum campo está vazio
  const camposVazios = camposObrigatorios.some((campo) => !body[campo]);

  if (camposVazios) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  // Verifica se o habitat existe no banco de dados
  try {
    const habitat = await habitatsModel.procuraHabitatPorId(body.habitat_id);

    if (!habitat) {
      return res.status(404).json({ error: "Habitat não encontrado." });
    }

    next(); // Se o habitat existir, segue para a criação da capivara
  } catch (error) {
    return res.status(500).json({ error: "Erro ao verificar o habitat." });
  }
};

module.exports = {
  validarBody,
};
