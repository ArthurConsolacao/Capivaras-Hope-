<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Hope</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/capivaras">Capivaras</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/habitats">Habitats</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/pesquisa-capivara">Pesquisar</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  name: 'MyNavbar'
}
</script>

<style scoped>
.navbar {
  font-family: "Poppins", sans-serif;
  height: 84px;
}
</style>
