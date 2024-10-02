import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import CapivaraList from "@/views/Capivaras/CapivaraList.vue";
import CapivaraDetail from "@/views/Capivaras/CapivaraDetail.vue";
import CapivaraEdit from "@/views/Capivaras/CapivaraEdit.vue";
import AddCapivara from "@/views/Capivaras/AddCapivara.vue";
import AddHabitat from "@/views/Habitats/AddHabitat.vue";
import HabitatsList from "@/views/Habitats/HabitatsList.vue";
import HabitatEdit from "@/views/Habitats/HabitatEdit.vue";
import PesquisaCapivara from "@/views/PesquisaCapivara.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/capivaras",
    name: "CapivaraList",
    component: CapivaraList,
  },
  {
    path: "/capivaras/add",
    name: "AddCapivara",
    component: AddCapivara,
  },
  {
    path: "/capivara/:id",
    name: "CapivaraDetail",
    component: CapivaraDetail,
  },
  {
    path: "/capivara/edit/:id",
    name: "CapivaraEdit",
    component: CapivaraEdit,
  },
  {
    path: "/habitats",
    name: "HabitatsList",
    component: HabitatsList,
  },
  {
    path: "/habitats/add",
    name: "AddHabitat",
    component: AddHabitat,
  },
  {
    path: "/habitat/edit/:id",
    name: "HabitatEdit",
    component: HabitatEdit,
  },
  {
    path: "/pesquisa-capivara",
    name: "PesquisaCapivara",
    component: PesquisaCapivara,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
