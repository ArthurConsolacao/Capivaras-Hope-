<template>
  <CapivaraForm :capivaraData="capivara" :isEdit="true" />
</template>

<script>
import CapivaraForm from '@/components/CapivaraForm.vue';
import axios from 'axios';

export default {
  name: 'CapivaraEdit',
  components: {
    CapivaraForm
  },
  data() {
    return {
      capivara: {},
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const response = await axios.get(`${process.env.VUE_APP_API_URL}/capivaras/${id}`);
    this.capivara = response.data;
  },
};
</script>
