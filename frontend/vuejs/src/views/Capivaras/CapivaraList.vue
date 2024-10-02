<template>
  <div class="container mt-5">
    <h1 class="title text-center">Lista de Capivaras</h1>
    <div class="grid-header-container">
      <p><router-link class="nav-bar" to="/capivaras/add">Adicionar</router-link></p>
    </div>
     
    <div class="grid-header-container">
      <p>NOME</p>
      <p>IDADE (ANOS)</p>
      <p>PESO (KG)</p>
      <p>STATUS DE SAÚDE</p>
      <p>AÇÕES</p>
    </div>
    <div class="row">
      <CapivaraCard v-for="capivara in capivaras" :key="capivara.id" :capivara="capivara" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CapivaraCard from '@/components/CapivaraCard.vue';

export default {
  name: 'CapivaraList',
  components: {
    CapivaraCard
  },
  data() {
    return {
      capivaras: []
    };
  },
  methods: {
    async fetchCapivaras() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/capivaras`);
        this.capivaras = response.data;
      } catch (error) {
        console.error('Erro ao buscar capivaras:', error);
        alert('Erro ao buscar capivaras: ' + error.message);
      }
    }
  },
  mounted() {
    this.fetchCapivaras();
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 16px;
}

.grid-header-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 2fr;
  gap: 24px;
  text-align: left;
  color: grey;
  padding: 0px 12px 24px;
}
</style>
