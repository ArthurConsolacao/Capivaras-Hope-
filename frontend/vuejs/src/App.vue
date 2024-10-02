<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <MyNavbar />
    <div class="flex-grow-1 main-content">
      <router-view />
    </div>
    <MyFooter />
  </div>
</template>

<script>
import MyNavbar from '@/components/MyNavbar.vue';
import MyFooter from './components/MyFooter.vue';

export default {
  name: 'App',
  components: {
    MyNavbar,
    MyFooter
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  margin: 0;
}

#app p {
  margin: 0 !important;
}

#app h1 {
  font-weight: 700 !important;
  color: #42b983 !important;
  padding-bottom: 72px;
}


#app {
  font-family: "Poppins", "sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  margin: 0;
  padding: 0;
}

#app .btn {
  height: 52px;
  border-radius: 4px;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

#app .btn-primary {
  background-color: transparent;
  border: 1px solid rgb(192, 192, 192);
  color: #1f1f1f;
}

#app .btn-primary:hover {
  background: rgb(201, 201, 201);
  border: 1px solid rgb(192, 192, 192);
  color: #1f1f1f;
}

#app .btn-secondary {
  background-color: #42b983;
  border: 1px solid #249c66;
}

#app .btn-secondary:hover {
  background: #249c66;
  border: 1px solid #249c66;
}

#app .btn-delete {
  background-color: #ff004c;
  border: 1px solid #b40338;
  color: white;
}

#app .btn-delete:hover {
  background-color: #b40338;
}

.main-content {
  margin-top: 108px;
  padding-bottom: 48px;
}
</style>
