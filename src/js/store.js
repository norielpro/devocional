import { createStore } from 'framework7/lite';

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/norielpro/devocional/main/devocionales.json';
const STORAGE_KEY = 'devocionales_cache';
const CACHE_VERSION_KEY = 'devocionales_version';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;

function getCachedData() {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    const timestamp = localStorage.getItem(CACHE_VERSION_KEY);
    if (cached && timestamp) {
      const age = Date.now() - parseInt(timestamp);
      if (age < CACHE_EXPIRY) {
        return JSON.parse(cached);
      }
    }
  } catch (e) {
    console.error('Error reading cache:', e);
  }
  return null;
}

function setCachedData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_VERSION_KEY, Date.now().toString());
  } catch (e) {
    console.error('Error saving cache:', e);
  }
}

function getDevocionalesFallback() {
  const cached = getCachedData();
  if (cached) return cached;
  
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

const store = createStore({
  state: {
    devocionales: getCachedData() || getDevocionalesFallback(),
    devocionalSeleccionado: null,
    loading: false,
    error: null,
    lastUpdate: null,
  },
  getters: {
    devocionales({ state }) {
      return state.devocionales;
    },
    devocionalActual({ state }) {
      if (state.devocionalSeleccionado) {
        return state.devocionalSeleccionado;
      }
      if (!state.devocionales.length) return null;
      
      const hoy = new Date();
      const semanaDelAnio = getWeekNumber(hoy);
      const indice = semanaDelAnio % state.devocionales.length;
      
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
        const nuevosDevocionales = data.devocionales || [];
        
        if (nuevosDevocionales.length > 0) {
          state.devocionales = nuevosDevocionales;
          setCachedData(nuevosDevocionales);
          state.lastUpdate = new Date().toISOString();
        }
        
        state.loading = false;
      } catch (err) {
        console.log('Sin conexión, usando datos locales');
        state.error = err.message;
        
        if (!state.devocionales || state.devocionales.length === 0) {
          state.devocionales = getDevocionalesFallback();
          setCachedData(state.devocionales);
        }
        state.loading = false;
      }
    },
    seleccionarDevocional({ state }, devocional) {
      state.devocionalSeleccionado = devocional;
    },
    limpiarSeleccion({ state }) {
      state.devocionalSeleccionado = null;
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

export default store;