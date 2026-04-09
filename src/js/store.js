import { createStore } from 'framework7/lite';

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/devocionales.json';

const store = createStore({
  state: {
    devocionales: [],
    devocionalActual: null,
    loading: true,
    error: null,
    selectedDate: null,
  },
  getters: {
    devocionales({ state }) {
      return state.devocionales;
    },
    devocionalDelDia({ state }) {
      if (!state.devocionales.length) return null;
      
      const hoy = new Date();
      const diaSemana = hoy.getDay();
      const semanaDelAnio = getWeekNumber(hoy);
      const indice = (semanaDelAnio + diaSemana) % state.devocionales.length;
      
      return state.devocionales[indice] || state.devocionales[0];
    },
  },
  actions: {
    async fetchDevocionales({ state }) {
      state.loading = true;
      state.error = null;
      
      try {
        const response = await fetch(GITHUB_RAW_URL);
        if (!response.ok) throw new Error('No se pudo cargar el JSON');
        const data = await response.json();
        state.devocionales = data.devocionales || [];
        state.loading = false;
      } catch (err) {
        state.error = err.message;
        state.devocionales = getDevocionalesFallback();
        state.loading = false;
      }
    },
    setDevocionalActual({ state }, devocional) {
      state.devocionalActual = devocional;
    },
  },
});

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getDevocionalesFallback() {
  return [
    {
      id: 1,
      titulo: 'La Paz que Sobrepasa Todo',
      fecha: '9 de Abril, 2026',
      versiculo: 'Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestras mentes en Cristo Jesús. - Filipenses 4:7',
      reflexion: 'En medio de las tormentas de la vida, Dios nos ofrece una paz que va más allá de lo que podemos comprender.',
      oracion: 'Señor, gracias por tu paz que sobrepasa todo entendimiento. Amén.'
    },
  ];
}

export default store;