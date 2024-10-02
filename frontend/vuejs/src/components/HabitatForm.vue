<template>
  <div class="container mt-5">
    <h2>{{ isEdit ? 'Editar Habitat' : 'Adicionar Habitat' }}</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="nome" class="form-label">Nome</label>
        <input type="text" v-model="habitat.nome" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="descricao" class="form-label">Descrição</label>
        <textarea v-model="habitat.descricao" class="form-control"></textarea>
      </div>

      <button type="submit" class="btn btn-secondary">
        {{ isEdit ? 'Atualizar Habitat' : 'Adicionar Habitat' }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HabitatForm',
  props: {
    habitatData: {
      type: Object,
      default: () => ({}),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      habitat: {
        nome: this.habitatData.nome,
        descricao: this.habitatData.descricao,
      },
    };
  },
  async mounted() {
    if (this.isEdit) {
      const habitatId = this.$route.params.id;
      await this.fetchHabitat(habitatId);
    }
  },
  methods: {
    async fetchHabitat(id) {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/habitats/${id}`);
        this.habitat = response.data;
      } catch (error) {
        console.error('Erro ao buscar habitat:', error);
        alert('Erro ao buscar habitat: ' + error.message);
      }
    },
    
    async submitForm() {
      try {
        if (this.isEdit) {
          // Atualizar habitat
          await axios.put(`${process.env.VUE_APP_API_URL}/habitats/${this.habitatData.id}`, this.habitat);
        } else {
          // Adicionar novo habitat
          await axios.post(`${process.env.VUE_APP_API_URL}/habitats`, this.habitat);
        }
        // Redirecionar ou notificar sucesso
        this.$router.push('/habitats'); 
      } catch (error) {
        console.error('Erro ao salvar habitat:', error);
        alert('Erro ao salvar habitat: ' + error.message);
      }
    },

  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.btn {
  width: 100%;
}
</style>