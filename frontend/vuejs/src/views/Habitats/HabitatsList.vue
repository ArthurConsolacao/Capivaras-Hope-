<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Lista de Habitats</h1>
    <div class="grid-header-container">
      <p><router-link class="nav-bar" to="/habitats/add">Adicionar</router-link></p> 
    </div>
    <div class="grid-header-container">
      <p>ID</p>
      <p>NOME</p>
      <p>DESCRIÇÃO</p>
      <p>AÇÕES</p>
    </div>
    <div class="row">

      <div class="card" v-for="habitat in habitats" :key="habitat.id">
        <div class=" grid-container">

          <p>{{ habitat.id }}</p>
          <p>{{ habitat.nome }}</p>
          <p>{{ habitat.descricao }}</p>
          <div class="actions-btn-container">
            <router-link :to="`/habitat/edit/${habitat.id}`" class="btn btn-primary">Editar</router-link>
            <button class="btn btn-delete" @click="deleteHabitat(habitat.id)">Excluir</button>

          </div>
        </div>
      </div>
    </div>
    <div v-if="!habitats.length" class="text-center">
      <p>Nenhum habitat cadastrado.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HabitatsList',
  data() {
    return {
      habitats: [],
    };
  },
  methods: {
    async fetchHabitats() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/habitats`);
        this.habitats = response.data;
      } catch (error) {
        console.error('Erro ao buscar habitats:', error);
        alert('Erro ao buscar habitats: ' + error.message);
      }
    },
    async deleteHabitat(id) {
      if (confirm('Tem certeza que deseja excluir este habitat?')) {
        try {
          await axios.delete(`${process.env.VUE_APP_API_URL}/habitats/${id}`);
          this.habitats = this.habitats.filter(habitat => habitat.id !== id); // Remove o habitat da lista localmente
          alert('Habitat excluído com sucesso!');
        } catch (error) {
          console.error('Erro ao excluir habitat:', error);
          alert('Erro ao excluir habitat: ' + error.message);
        }
      }
    },
  },
  mounted() {
    this.fetchHabitats();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}

.card {
  cursor: pointer;
  padding: 12px 24px;
  border: 1px solid rgb(197, 197, 197);
  box-shadow: none;
  border-radius: 4px;
}


.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 6fr 2fr;
  gap: 24px;
  text-align: left;
  align-items: center;
}

.actions-btn-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 16px;
}

.grid-header-container {
  display: grid;
  grid-template-columns: 1fr 1fr 6fr 2fr;
  gap: 24px;
  text-align: left;
  color: grey;
  padding: 0px 12px 24px;
}
</style>