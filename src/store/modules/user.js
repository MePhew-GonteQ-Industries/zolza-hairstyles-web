import axios from 'axios';

export default {
  state: {
    name: '',
    surname: '',
    gender: '',
    email: '',
    permissionLevel: [],
    verified: null,
    createdAt: '',
  },

  getters: {
    isLoggedIn(state) {
      return !!(state.name && state.surname && state.gender
        && state.email && state.permissionLevel && state.verified !== null && state.createdAt);
    },
    isAdmin(state, getters) {
      return (getters.isLoggedIn && state.permissionLevel.includes('admin'));
    },
    isOwner(state, getters) {
      return (getters.isAdmin && state.permissionLevel.includes('owner'));
    },
  },

  mutations: {
    setUserData(state, userData) {
      state.name = userData.name;
      state.surname = userData.surname;
      state.gender = userData.gender;
      state.email = userData.email;
      state.permissionLevel = userData.permissionLevel
        ? userData.permissionLevel : userData.permission_level;
      state.verified = userData.verified;
      state.createdAt = userData.createdAt ? userData.createdAt : userData.created_at;
    },
  },

  actions: {
    async checkUserData({ getters, commit, dispatch }) {
      if (!getters.isLoggedIn) {
        const response = await axios.get('users/me');
        commit('setUserData', response.data);
        await dispatch('saveUserData');
      }
    },

    async loadUserData({ commit }) {
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (userData) {
        await commit('setUserData', userData);
      }
    },

    saveUserData({ state }) {
      localStorage.setItem('userData', JSON.stringify({
        name: state.name,
        surname: state.surname,
        gender: state.gender,
        email: state.email,
        permissionLevel: state.permissionLevel,
        verified: state.verified,
        createdAt: state.createdAt,
      }));
    },

    deleteUserData({ commit }) {
      commit('setUserData', {
        name: '',
        surname: '',
        gender: '',
        email: '',
        permissionLevel: [],
        verified: null,
        createdAt: '',
      });
      localStorage.removeItem('userData');
    },
  },
};
