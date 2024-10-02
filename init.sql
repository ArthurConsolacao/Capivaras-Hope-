-- Criação da tabela habitats
CREATE TABLE IF NOT EXISTS habitats (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255)
);

-- Criação da tabela capivaras com chave estrangeira para habitats
CREATE TABLE IF NOT EXISTS capivaras (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    peso FLOAT NOT NULL,
    status_saude VARCHAR(255) NOT NULL,
    comportamento VARCHAR(255) NOT NULL,
    dieta VARCHAR(255) NOT NULL,
    observacoes VARCHAR(255) NOT NULL,
    foto VARCHAR(255),
    habitat_id INT,
    CONSTRAINT fk_habitat FOREIGN KEY (habitat_id) REFERENCES habitats(id)
);
