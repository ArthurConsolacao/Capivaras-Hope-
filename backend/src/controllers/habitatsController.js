const habitatsModel = require("../models/habitatsModel");

const getAll = async (req, res) => {
  const habitats = await habitatsModel.getAll();
  return res.status(200).json(habitats);
};
const getPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const habitat = await habitatsModel.getPorId(id);

    if (!habitat) {
      return res.status(404).json({ message: "habitat não encontrada" });
    }

    return res.status(200).json(habitat);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createHabitat = async (req, res) => {
  const createHabitat = await habitatsModel.createHabitat(req.body);
  return res.status(201).json(req.body);
};

const deleteHabitat = async (req, res) => {
  const { id } = req.params;

  await habitatsModel.deleteHabitat(id);
  return res.status(204).json();
};

const updateHabitat = async (req, res) => {
  const { id } = req.params;
  const habitat = req.body;

  try {
    const habitatAtualizado = await habitatsModel.updateHabitat(id, habitat);

    if (!habitatAtualizado) {
      return res.status(404).json({ message: "Habitat não encontrado" });
    }

    return res
      .status(200)
      .json({
        message: "Habitat atualizado com sucesso",
        habitat: habitatAtualizado,
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getPorId,
  createHabitat,
  deleteHabitat,
  updateHabitat,
};
