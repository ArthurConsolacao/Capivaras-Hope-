const connection = require("./connection");

const getAll = async () => {
  const habitats = await connection.query("SELECT * FROM habitats");
  return habitats.rows;
};

const getPorId = async (id) => {
  const query = "SELECT * FROM habitats WHERE id = $1";

  try {
    const result = await connection.query(query, [id]);

    // Verifica se a habitat foi encontrada
    if (result.rows.length === 0) {
      return null; // habitat não encontrada
    }

    return result.rows[0]; // Retorna a habitat encontrada
  } catch (error) {
    console.error("Erro ao buscar habitat:", error);
    throw new Error("Erro ao buscar habitat");
  }
};

const procuraHabitatPorId = async (id) => {
  const query = "SELECT * FROM habitats WHERE id = $1";

  try {
    const result = await connection.query(query, [id]);

    // Verifica se encontrou algum registro
    if (result.rows.length === 0) {
      return null; // Retorna null se o habitat não for encontrado
    }

    return result.rows[0]; // Retorna o habitat encontrado
  } catch (error) {
    console.error("Erro ao encontrar habitat por ID:", error);
    throw new Error("Erro ao encontrar habitat");
  }
};

const createHabitat = async (habitat) => {
  const { nome, descricao = "Sem descrição" } = habitat;

  const query = ` INSERT INTO habitats (nome, descricao) 
        VALUES ($1, $2) RETURNING *`;

  const values = [nome, descricao];

  try {
    const result = await connection.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Erro ao criar habitat:", error);
    throw new Error("Erro ao criar habitat");
  }
};

const deleteHabitat = async (id) => {
  const query = "DELETE FROM habitats WHERE id = $1";

  try {
    const result = await connection.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.error("Erro ao deletar Habitat:", error);
    throw new Error("Erro ao deletar Habitat");
  }
};

const updateHabitat = async (id, habitat) => {
  const query = `UPDATE habitats SET nome = $1, descricao = $2 
        WHERE id = $3 RETURNING *`;

  const values = [habitat.nome, habitat.descricao, id];

  try {
    const result = await connection.query(query, values);

    // Verifica se a habitat foi encontrada e atualizada
    if (result.rows.length === 0) {
      return null; // habitat não encontrada
    }

    return result.rows[0]; // Retorna a habitat atualizada
  } catch (error) {
    console.error("Erro ao atualizar habitat:", error);
    throw new Error("Erro ao atualizar habitat");
  }
};

module.exports = {
  getAll,
  getPorId,
  procuraHabitatPorId,
  createHabitat,
  deleteHabitat,
  updateHabitat,
};
