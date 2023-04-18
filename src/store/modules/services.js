import axios from "axios";

export default {
  state: {
    services: [],
  },
  getters: {
    getServiceById: (state) => (id) => state.services.find((service) => service.id === id),
  },
  mutations: {
    updateServices(state, services) {
      state.services = services;
    },
  },
  actions: {
    async loadServices({ state, commit }) {
      if (!state.services.length) {
        const response = await axios.get("services/details");
        commit("updateServices", response.data);
      }
    },
    deleteServices({ commit }) {
      commit("updateSessions", []);
    },
  },
};
