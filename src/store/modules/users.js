import axios from "axios";
import { handleRequestError } from "@/utils";

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
        try {
          const response = await axios.get("users");
          commit("updateUsers", response.data.users);
        } catch (error) {
          handleRequestError(error);
        }
      }
    },
    deleteUsers({ commit }) {
      commit("updateSessions", []);
    },
  },
};
