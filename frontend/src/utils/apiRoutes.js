// Rotas da API
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ROUTES = {
  LIST: `${BASE_URL}/list`,
  SYNC: `${BASE_URL}/sync`,
  CEP: (id) => `${BASE_URL}/ceps/${id}`,
  TOGGLE_FAVORITE: (id) => `${BASE_URL}/ceps/${id}/toggle-favorite`,
};
