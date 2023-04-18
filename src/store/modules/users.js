import axios from "axios";

export default {
  state: {
    users: [],
  },
  getters: {
    getUserById: (state) => (id) => state.users.find((user) => user.id === id),
  },
  mutations: {
    updateUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    async loadUsers({ state, commit }) {
      if (!state.users.length) {
        const response = await axios.get("users");
        commit("updateUsers", response.data.users);
      }
    },
    deleteUsers({ commit }) {
      commit("updateSessions", []);
    },
  },
};
