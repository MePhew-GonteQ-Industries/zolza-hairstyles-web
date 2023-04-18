import axios from "axios";

export default {
  state: {
    sessions: [],
  },
  getters: {
    getSessionById: (state) => (id) => state.sessions.find((session) => session.id === id),
  },
  mutations: {
    updateSessions(state, sessions) {
      state.sessions = sessions;
    },
  },
  actions: {
    async loadSessions({ state, commit }) {
      if (!state.sessions.length) {
        const response = await axios.get("auth/sessions");
        commit("updateSessions", response.data);
      }
    },
    deleteSessions({ commit }) {
      commit("updateSessions", []);
    },
  },
};
