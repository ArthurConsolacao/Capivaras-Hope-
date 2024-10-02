<template>
  <div class="home">
    <h1 class="title-home">Bem-vindo ao Hope</h1>
    <img src="../media/capivaraMestre.jpeg" alt="Imagem de capivara" class="imagem-estatica">
    <p>Aqui você pode cadastrar e gerenciar informações das capivaras e dos habitats.</p>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

.title-home {
  padding-bottom: 36px !important;
}

/* Estilize a imagem */
.imagem-estatica {
  max-width: 300px;
  /* Ajuste conforme necessário */
  margin-top: 20px;
  border-radius: 10px;
  /* Se quiser bordas arredondadas */
  padding-bottom: 32px;
}
</style>