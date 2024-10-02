const connection = require("./connection");
const fs = require("fs");
const path = require("path");

const getALL = async () => {
  const capivaras = await connection.query("SELECT * FROM capivaras");
  return capivaras.rows;
};
const getPorId = async (id) => {
  const query = "SELECT * FROM capivaras WHERE id = $1";

  try {
    const result = await connection.query(query, [id]);

    // Verifica se a capivara foi encontrada
    if (result.rows.length === 0) {
      return null; // Capivara não encontrada
    }

    return result.rows[0]; // Retorna a capivara encontrada
  } catch (error) {
    console.error("Erro ao buscar capivara:", error);
    throw new Error("Erro ao buscar capivara");
  }
};

const getPorHabitat = async (habitatId) => {
  const query = "SELECT * FROM capivaras WHERE habitat_id = $1";

  try {
    const result = await connection.query(query, [habitatId]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows;
  } catch (error) {
    console.error("Erro ao buscar capivaras por habitat:", error);
    throw new Error("Erro ao buscar capivaras por habitat");
  }
};

const createCapivara = async (capivara) => {
  const query = `
        INSERT INTO capivaras (nome, idade, peso, status_saude, comportamento, dieta, observacoes, habitat_id, foto) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
  const values = [
    capivara.nome,
    capivara.idade,
    capivara.peso,
    capivara.status_saude,
    capivara.comportamento,
    capivara.dieta,
    capivara.observacoes,
    capivara.habitat_id,
    capivara.foto || null, // Se não houver foto, insira NULL
  ];

  try {
    const result = await connection.query(query, values);
    return result.rows[0]; // Retorna o registro criado
  } catch (error) {
    console.error("Erro ao criar capivara:", error);
    throw new Error("Erro ao criar capivara");
  }
};

module.exports = {
  createCapivara,
};

const deleteCapivara = async (id) => {
  // Primeiro, buscamos o caminho da foto da capivara a ser deletada
  const querySelect = "SELECT foto FROM capivaras WHERE id = $1";
  const queryDelete = "DELETE FROM capivaras WHERE id = $1";

  try {
    // Buscamos o caminho da foto
    const resultSelect = await connection.query(querySelect, [id]);
    if (resultSelect.rows.length === 0) {
      return null; // Capivara não encontrada
    }

    const { foto } = resultSelect.rows[0]; // Recupera o caminho da foto

    // Excluímos a capivara
    const resultDelete = await connection.query(queryDelete, [id]);
    if (resultDelete.rowCount === 0) {
      return null;
    }

    // Se a capivara tiver uma foto, excluímos o arquivo
    if (foto) {
      // Corrigir o caminho da foto
      const filePath = path.join(__dirname, "..", foto); // Remova 'src' da string

      // Verificamos se o arquivo existe e o removemos
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Erro ao excluir a foto da capivara:", err);
        } else {
          console.log("Foto da capivara excluída com sucesso");
        }
      });
    }

    return resultDelete.rows[0];
  } catch (error) {
    console.error("Erro ao deletar capivara:", error);
    throw new Error("Erro ao deletar capivara");
  }
};

const updateCapivara = async (id, capivara) => {
  const query = `
        UPDATE capivaras
        SET nome = $1, idade = $2, peso = $3, status_saude = $4, comportamento = $5, dieta = $6, observacoes = $7, habitat_id = $8, foto = $9
        WHERE id = $10 RETURNING *`;

  const values = [
    capivara.nome,
    capivara.idade,
    capivara.peso,
    capivara.status_saude,
    capivara.comportamento,
    capivara.dieta,
    capivara.observacoes,
    capivara.habitat_id,
    capivara.foto,
    id,
  ];

  try {
    const result = await connection.query(query, values);

    // Verifica se a capivara foi encontrada e atualizada
    if (result.rows.length === 0) {
      return null; // Capivara não encontrada
    }

    return result.rows[0]; // Retorna a capivara atualizada
  } catch (error) {
    console.error("Erro ao atualizar capivara:", error);
    throw new Error("Erro ao atualizar capivara");
  }
};

module.exports = {
  getALL,
  getPorId,
  getPorHabitat,
  createCapivara,
  deleteCapivara,
  updateCapivara,
};
