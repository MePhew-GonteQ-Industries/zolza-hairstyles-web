import axios from 'axios';
import { handleRequestError } from '@/utils';

export default {
  state: {
    sessions: [],
  },
  getters: {
    getSessionById: (state) => (id) => state.sessions.find(
      (session) => session.id === id,
    ),
  },
  mutations: {
    updateSessions(state, sessions) {
      state.sessions = sessions;
    },
  },
  actions: {
    async loadSessions({ state, commit }) {
      if (!state.sessions.length) {
        try {
          const response = await axios.get('auth/sessions');
          commit('updateSessions', response.data);
        } catch (error) {
          handleRequestError(error);
        }
      }
    },
    deleteSessions({ commit }) {
      commit('updateSessions', []);
    },
  },
};
