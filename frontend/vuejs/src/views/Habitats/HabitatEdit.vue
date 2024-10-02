<template>
  <div class="container mt-5">
    <HabitatForm :habitatData="habitat" :isEdit="true" />
  </div>
</template>

<script>
import HabitatForm from '@/components/HabitatForm.vue';
import axios from 'axios';

export default {
  name: 'HabitatEdit',
  components: {
    HabitatForm
  },
  data() {
    return {
      habitat: {},
    };
  },
  async mounted() {
    const id = this.$route.params.id; // Captura o ID do habitat
    try {
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/habitats/${id}`);
      this.habitat = response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do habitat:', error);
    }
  },
};
</script>
