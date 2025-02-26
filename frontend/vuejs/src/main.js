import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

import BootstrapVue3 from "bootstrap-vue-3";

createApp(App).use(router).use(BootstrapVue3).mount("#app");
