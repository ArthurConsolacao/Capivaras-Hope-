# Projeto Hope - Gestão de Capivaras

Este projeto é uma aplicação completa para o gerenciamento de capivaras, com frontend em Vue.js e backend em Node.js (Express), utilizando PostgreSQL como banco de dados. A aplicação permite cadastrar, editar, excluir e visualizar capivaras, além de associar fotos e habitats às capivaras.

## Tecnologias Utilizadas

- **Frontend**: Vue.js
- **Backend**: Node.js (Express)
- **Banco de Dados**: PostgreSQL
- **Docker**: Contêinerização dos serviços
- **Nginx**: Para servir o frontend

## Como Rodar o Projeto com Docker

### Pré-requisitos

- Docker e Docker Compose instalados

### Passos para Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/seurepositorio.git
   cd seurepositorio

2. Execute o comando "docker-compose up --build"

3.  O backend estará disponível em: http://localhost:3000
    O frontend estará disponível em: http://localhost:8080
    O banco de dados PostgreSQL estará disponível em: localhost:5432 (use as credenciais definidas no arquivo docker-compose.yml).

## Funcionalidades
- CRUD de capivaras com foto e habitat.
- CRUD de habitats.
- Pesquisa de Capivaras