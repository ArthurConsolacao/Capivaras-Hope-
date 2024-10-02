const { Pool } = require("pg");

// Crie um pool de conexões usando a variável de ambiente
const pool = new Pool({
  connectionString: process.env.DATABASE_URL // Usa a variável de ambiente
});

// Função para testar a conexão
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Erro ao conectar ao banco de dados:", err.stack);
  }
  console.log("Conectado ao banco de dados PostgreSQL via Docker!");
  release(); // Libera o cliente após o uso
});

module.exports = pool;
