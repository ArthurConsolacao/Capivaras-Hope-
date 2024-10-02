<template>
    <div class="container mt-5">
        <h1>Pesquisar Capivaras por Habitat</h1>

        <!-- Dropdown para selecionar o habitat -->
        <div class="form-group mt-4">
            <label for="habitat">Selecione o Habitat</label>
            <select v-model="selectedHabitat" class="form-control" @change="fetchCapivaras">
                <option disabled value="">Selecione um habitat</option>
                <option v-for="habitat in habitats" :key="habitat.id" :value="habitat.id">
                    {{ habitat.nome }}
                </option>
            </select>
        </div>

        <!-- Exibir capivaras após selecionar o habitat -->
        <div v-if="capivaras.length > 0" class="capivara-list mt-4">
            <h3>Capivaras do Habitat</h3>
            <div class="row">
                <CapivaraCard v-for="capivara in capivaras" :key="capivara.id" :capivara="capivara" />
            </div>
        </div>

        <!-- Mensagem se não houver capivaras para o habitat selecionado -->
        <div v-else-if="selectedHabitat && capivaras.length === 0" class="mt-4">
            <p>Nenhuma capivara encontrada para o habitat selecionado.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import CapivaraCard from '@/components/CapivaraCard.vue'; 

export default {
    name: 'PesquisaCapivara',
    components: {
        CapivaraCard, // Registrando o componente
    },
    data() {
        return {
            habitats: [], // Armazena os habitats disponíveis
            selectedHabitat: '', // Armazena o habitat selecionado
            capivaras: [] // Armazena as capivaras do habitat selecionado
        };
    },
    computed: {
        // Computed property para usar a variável de ambiente
        apiUrl() {
            return process.env.VUE_APP_API_URL;
        },
    },
    async mounted() {
        // Carrega os habitats disponíveis ao carregar o componente
        await this.fetchHabitats();
    },
    methods: {
        // Método para carregar os habitats
        async fetchHabitats() {
            try {
                const response = await axios.get(`${this.apiUrl}/habitats`);
                this.habitats = response.data;
            } catch (error) {
                console.error('Erro ao buscar habitats:', error);
            }
        },

        // Método para buscar capivaras por habitat
        async fetchCapivaras() {
            // Limpa o array de capivaras antes de fazer uma nova busca
            this.capivaras = [];

            if (this.selectedHabitat) {
                try {
                    const response = await axios.get(`${this.apiUrl}/capivaras/pesquisar/${this.selectedHabitat}`);
                    this.capivaras = response.data;
                } catch (error) {
                    console.error('Erro ao buscar capivaras:', error);
                }
            }
        }
    }
};
</script>

<style scoped>
/* Estilos para os cards e layout */
.card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
}
</style>