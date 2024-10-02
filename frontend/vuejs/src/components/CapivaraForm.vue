<template>
  <div class="container mt-5">
    <h1>{{ isEdit ? 'Editar Capivara' : 'Adicionar Capivara' }}</h1>
    <form @submit.prevent="submitForm">

      <div class="mb-3">
        <label for="foto" class="form-label">Foto</label>
        <input type="file" @change="handleFileUpload" class="form-control" />
      </div>

      <div class="firstRow">
        <div class="mb-3 input-and-label">
          <label for="habitat_id" class="form-label">Habitat</label>
          <select v-model="capivara.habitat_id" class="form-control input" required>
            <option disabled value="">Selecione um habitat</option>
            <option v-for="habitat in habitats" :key="habitat.id" :value="habitat.id">
              {{ habitat.nome }}
            </option>
          </select>
        </div>

        <div class="mb-3 input-and-label">
          <label for="nome" class="form-label">Nome</label>
          <input type="text" v-model="capivara.nome" class="form-control input" required />
        </div>
      </div>

      <div class="secondRow">
        <div class="mb-3 input-and-label">
          <label for="idade" class="form-label">Idade</label>
          <input type="number" v-model="capivara.idade" class="form-control input" required />
        </div>
        <div class="mb-3 input-and-label">
          <label for="peso" class="form-label">Peso (kg)</label>
          <input type="number" v-model="capivara.peso" class="form-control input" required />
        </div>
        <div class="mb-3 input-and-label">
          <label for="status_saude" class="form-label">Status de Saúde</label>
          <input type="text" v-model="capivara.status_saude" class="form-control input" required />
        </div>
      </div>

      <div class="mb-3 input-and-label">
        <label for="comportamento" class="form-label">Comportamento</label>
        <textarea v-model="capivara.comportamento" required class="form-control input"></textarea>
      </div>

      <div class="mb-3 input-and-label">
        <label for="dieta" class="form-label">Dieta</label>
        <textarea v-model="capivara.dieta" required class="form-control input"></textarea>
      </div>

      <div class="mb-3 input-and-label">
        <label for="observacoes" class="form-label">Observações</label>
        <textarea v-model="capivara.observacoes" class="form-control input"></textarea>
      </div>

      <button type="submit" class="btn btn-secondary">
        {{ isEdit ? 'Atualizar Capivara' : 'Adicionar Capivara' }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CapivaraForm',
  props: {
    capivaraData: {
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
      capivara: {
        nome: this.capivaraData.nome || '',
        idade: this.capivaraData.idade || '',
        peso: this.capivaraData.peso || '',
        status_saude: this.capivaraData.status_saude || '',
        comportamento: this.capivaraData.comportamento || '',
        dieta: this.capivaraData.dieta || '',
        observacoes: this.capivaraData.observacoes || '',
        habitat_id: this.capivaraData.habitat_id || '',
      },
      foto: null,
      habitats: [], // Lista de habitats disponíveis
    };
  },
  async mounted() {
    await this.fetchHabitats(); // Busca os habitats disponíveis ao carregar o componente
    if (this.isEdit) {
      const capivaraId = this.$route.params.id;
      await this.fetchCapivara(capivaraId);
    }
  },
  methods: {
    // Função para buscar os dados da capivara
    async fetchCapivara(id) {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/capivaras/${id}`);
        this.capivara = response.data;
      } catch (error) {
        console.error('Erro ao buscar capivara:', error);
      }
    },
    async fetchHabitats() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/habitats`);
        this.habitats = response.data;
      } catch (error) {
        console.error('Erro ao buscar habitats:', error);
      }
    },
    handleFileUpload(event) {
      this.foto = event.target.files[0]; // Armazena o arquivo selecionado
    },

    async submitForm() {
      const formData = new FormData();

      // Adiciona os dados da capivara ao FormData
      for (const key in this.capivara) {
        formData.append(key, this.capivara[key]);
      }

      // Se a foto foi selecionada, adicione-a ao FormData
      if (this.foto) {
        formData.append('foto', this.foto);
      }

      try {
        if (this.isEdit) {
          const response = await axios.put(`${process.env.VUE_APP_API_URL}/capivaras/${this.capivaraData.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Capivara atualizada:', response.data);
        } else {
          const response = await axios.post(`${process.env.VUE_APP_API_URL}/capivaras`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Capivara adicionada:', response.data);
        }
        this.$router.push('/capivaras');
      } catch (error) {
        console.error('Erro ao salvar capivara:', error);
        alert('Erro ao salvar capivara: ' + error.message);
      }
    }

  },
};
</script>



<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr;
}

.firstRow {
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 24px;
}

.secondRow {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 24px;
}

.input-and-label {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.input {
  padding: 12px;
  font-size: 14px;
  box-shadow: none !important;
}

.form-label {
  color: grey;
  font-weight: 500;
}

.btn {
  width: 100%;
}
</style>