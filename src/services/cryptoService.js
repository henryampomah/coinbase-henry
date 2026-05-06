import api from './apiService';

export const cryptoService = {
  getAll: async () => {
    const response = await api.get('/crypto');
    return response.data;
  },

  getGainers: async () => {
    const response = await api.get('/crypto/gainers');
    return response.data;
  },

  getNewListings: async () => {
    const response = await api.get('/crypto/new');
    return response.data;
  },

  addCrypto: async (cryptoData) => {
    const response = await api.post('/crypto', cryptoData);
    return response.data;
  }
};