<template>
  <div class="container mt-5" v-if="capivara && habitat">

    <div class=" mt-4 d-flex justify-content-center">
      <div class="capivara-photo">
        <img :src="`${apiUrl}/${capivara.foto}`" alt="Foto da Capivara"
          class="img-fluid rounded-circle" v-if="capivara.foto" />
        <p v-else>Nenhuma foto disponível</p>
      </div>
    </div>

    <h1>{{ capivara.nome }}</h1>
    <div class="grid first-row">
      <div class="label-and-info">
        <label for="habitatId" class="form-label">Habitat</label>

        <p class="info">{{ habitat.id }}-{{ habitat.nome }}</p>
      </div>
      <div class="label-and-info">
        <label for="idade" class="form-label">Idade</label>
        <p class="info">{{ capivara.idade }} anos</p>
      </div>
      <div class="label-and-info">
        <label for="peso" class="form-label">Peso</label>
        <p class="info">{{ capivara.peso }} kg</p>
      </div>
    </div>
    <div class="grid second-row">
      <div class="label-and-info">
        <label for="dieta" class="form-label">Dieta</label>
        <p class="info">{{ capivara.dieta }}</p>
      </div>
      <div class="label-and-info">
        <label for="statusSaude" class="form-label">Status de Saúde:</label>
        <p class="info">{{ capivara.status_saude }}</p>
      </div>
      <div class="label-and-info">
        <label for="comportamento" class="form-label">Comportamento</label>
        <p class="info">{{ capivara.comportamento }}</p>
      </div>
      <div class="label-and-info">
        <label for="observacoes" class="form-label">Observações</label>
        <p class="info">{{ capivara.observacoes }}</p>
      </div>
    </div>

    <div class="mt-4 btn-container">
      <router-link :to="`/capivara/edit/${capivara.id}`" class="btn btn-primary">Editar</router-link>
      <button class="btn btn-delete" @click="deleteCapivara">Excluir</button>
    </div>
  </div>
  <div v-else>
    <p>Carregando...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CapivaraDetail',
  data() {
    return {
      capivara: null,
      habitat: null, // Armazena os dados do habitat
    };
  },
  computed: {
    // Computed property para usar a variável de ambiente
    apiUrl() {
      return process.env.VUE_APP_API_URL;
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      // Buscar detalhes da capivara
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/capivaras/${id}`);
      this.capivara = response.data;

      // Buscar detalhes do habitat pelo habitat_id
      const habitatResponse = await axios.get(`${process.env.VUE_APP_API_URL}/habitats/${this.capivara.habitat_id}`);
      this.habitat = habitatResponse.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes da capivara ou habitat:', error);
    }
  },
  methods: {
    async deleteCapivara() {
      if (confirm('Tem certeza que deseja excluir esta capivara?')) {
        try {
          const id = this.capivara.id;
          await axios.delete(`${process.env.VUE_APP_API_URL}/capivaras/${id}`);
          alert('Capivara excluída com sucesso!');
          this.$router.push('/capivaras'); // Redireciona para a lista após exclusão
        } catch (error) {
          console.error('Erro ao excluir capivara:', error);
          alert('Erro ao excluir capivara: ' + error.message);
        }
      }
    },
  },
};
</script>


<style scoped>
.capivara-photo {
  display: flex;
  justify-content: center;
  /* Centraliza a imagem horizontalmente */

}

img {
  width: 400px;
  /* Defina o tamanho desejado da imagem */
  height: 400px;
  /* Tamanho igual para largura e altura */
  object-fit: cover;
  /* Mantém o conteúdo da imagem dentro dos limites */
  border-radius: 50%;
  /* Torna a imagem redonda */

}

h1 {
  padding-bottom: 24px !important;
}

.container {
  max-width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}


.btn-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-content: center;
  justify-content: center;
}

.label-and-info {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.info {
  border: 1px solid rgb(212, 212, 212);
  padding: 12px;
  border-radius: 4px;
  width: 100%;
  text-align: left;
}

.form-label {
  font-weight: 600;
  color: grey;
}

.grid {
  display: grid;
  gap: 24px;

}

.first-row {
  grid-template-columns: 1fr 2fr 2fr;
}
</style>
