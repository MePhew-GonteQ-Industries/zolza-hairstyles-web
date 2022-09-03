import axios from 'axios';
import { handleRequestError } from '@/utils';

export default {
  state: {
    services: [],
  },
  getters: {
    getServiceById: (state) => (id) => state.services.find(
      (service) => service.id === id,
    ),
  },
  mutations: {
    updateServices(state, services) {
      state.services = services;
    },
  },
  actions: {
    async loadServices({ state, commit }) {
      if (!state.services.length) {
        try {
          const response = await axios.get('services/details');
          commit('updateServices', response.data);
        } catch (error) {
          handleRequestError(error);
        }
      }
    },
    deleteServices({ commit }) {
      commit('updateSessions', []);
    },
  },
};
