const capivarasModel = require("../models/capivarasModel");

const getAll = async (req, res) => {
  const capivaras = await capivarasModel.getALL();
  return res.status(200).json(capivaras);
};

const getPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const capivara = await capivarasModel.getPorId(id);

    if (!capivara) {
      return res.status(404).json({ message: "Capivara não encontrada" });
    }

    return res.status(200).json(capivara);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPorHabitat = async (req, res) => {
  const { habitatId } = req.params;

  try {
    const capivaras = await capivarasModel.getPorHabitat(habitatId);

    if (!capivaras) {
      return res
        .status(404)
        .json({ message: "Nenhuma capivara encontrada para este habitat" });
    }

    return res.status(200).json(capivaras);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createCapivara = async (req, res) => {
  // Cria um objeto capivara a partir de req.body
  const capivara = {
    ...req.body, // Espalha os dados do corpo
  };

  // Verifica se há uma foto enviada
  if (req.file) {
    capivara.foto = req.file.path.replace(/\\/g, "/"); // Substitui as barras invertidas por barras normais
    capivara.foto = capivara.foto.replace(/^.*\/src\//, "");
  } else {
    capivara.foto = null; // Ou atribua null se a foto não foi enviada
  }

  try {
    const novaCapivara = await capivarasModel.createCapivara(capivara); // Cria a capivara no banco de dados
    return res.status(201).json(novaCapivara); // Retorna a capivara criada
  } catch (error) {
    console.error("Erro ao criar capivara:", error);
    return res.status(500).json({ message: "Erro ao criar capivara" });
  }
};

const deleteCapivara = async (req, res) => {
  const { id } = req.params;

  await capivarasModel.deleteCapivara(id);
  return res.status(204).json();
};

const updateCapivara = async (req, res) => {
  const { id } = req.params;
  console.log("Dados recebidos para atualização:", req.body); // Adicione este log

  const formData = {
    ...req.body,
  };

  if (req.file) {
    formData.foto = req.file.path.replace(/\\/g, "/");
  }

  try {
    const capivaraAtualizada = await capivarasModel.updateCapivara(
      id,
      formData
    );
    if (!capivaraAtualizada) {
      return res.status(404).json({ message: "Capivara não encontrada" });
    }
    return res.status(200).json(capivaraAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar capivara:", error);
    return res.status(500).json({ message: "Erro ao atualizar capivara" });
  }
};

module.exports = {
  getAll,
  getPorId,
  getPorHabitat,
  createCapivara,
  deleteCapivara,
  updateCapivara,
};
