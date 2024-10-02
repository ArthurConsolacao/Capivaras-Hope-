<template>
  <div class="card">
    <div class="grid-container">
      <p><strong>{{ capivara.nome }}</strong></p>
      <p>{{ capivara.idade }}</p>
      <p>{{ capivara.peso }}</p>
      <p>{{ capivara.status_saude }}</p>
      <div class="actions-btn-container">
        <button class="btn btn-primary" @click="viewCapivara">Ver Detalhes</button>
        <button class="btn btn-secondary" @click="editCapivara">Editar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CapivaraCard',
  props: {
    capivara: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewCapivara() {
      this.$router.push(`/capivara/${this.capivara.id}`);
    },
    editCapivara() {
      this.$router.push(`/capivara/edit/${this.capivara.id}`);
    }
  }
}
</script>

<style scoped>
.card {
  cursor: pointer;
  padding: 12px 24px;
  border: 1px solid rgb(197, 197, 197);
  box-shadow: none;
  border-radius: 4px;
}


.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 2fr;
  gap: 24px;
  text-align: left;
  align-items: center;
}

.actions-btn-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
</style>