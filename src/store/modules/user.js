import axios from 'axios';

export default {
  state: {
    loggedIn: false,
    manuallyLoggedOut: false,
    accessToken: '',
    refreshToken: '',
    userData: null,
  },

  getters: {
  },

  mutations: {
    login(state, loginData) {
      state.loggedIn = true;
      state.manuallyLoggedOut = false;
      state.accessToken = loginData.access_token;
      state.refreshToken = loginData.refresh_token;
    },

    relogin(state, loginData) {
      state.loggedIn = true;
      state.manuallyLoggedOut = false;
      state.accessToken = loginData.accessToken;
      state.refreshToken = loginData.refreshToken;
    },

    logout(state) {
      state.loggedIn = false;
      state.manuallyLoggedOut = true;
      state.accessToken = '';
      state.refreshToken = '';
      state.userData = null;
    },

    setUserData(state, userData) {
      state.userData = userData;
    },
  },

  actions: {
    async checkUserData({ commit }) {
      const response = await axios.get('users/me');
      commit('setUserData', response.data);
    },

    setAuthHeader({ state }) {
      axios.defaults.headers.common.Authorization = `Bearer ${
        state.accessToken}`;
    },

    async loadUserData({ commit, dispatch }) {
      if (localStorage.getItem('loginData') && localStorage.getItem('userData')) {
        await commit('relogin', JSON.parse(localStorage.getItem('loginData')));
        await commit('setUserData', JSON.parse(localStorage.getItem('userData')));
        await dispatch('setAuthHeader');
      }
    },

    saveUserData({ state }) {
      localStorage.setItem('loginData', JSON.stringify(
        {
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        },
      ));
      localStorage.setItem('userData', JSON.stringify(
        state.userData,
      ));
    },

    async login({ commit, dispatch }, userData) {
      axios.post('auth/login', new URLSearchParams({
        grant_type: 'password',
        username: userData.email,
        password: userData.password,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(async (response) => {
        commit('login', response.data);
        await dispatch('setAuthHeader');
        await dispatch('checkUserData');
        await dispatch('saveUserData');
      })
        .catch((error) => {
          if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
            throw new Error(error.response.status);
          } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
            throw new Error(error.reques);
          } else {
          // Something happened in setting up the request that triggered an Error
            throw new Error(error.message);
          }
        });
    },

    removeAuthHeader() {
      axios.defaults.headers.common.Authorization = '';
    },

    deleteUser() {
      localStorage.removeItem('loginData');
      localStorage.removeItem('userData');
    },

    logout({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        axios.post('auth/logout').then(() => {
          dispatch('deleteUser');
          dispatch('removeAuthHeader');
          commit('logout');
          resolve();
        })
          .catch((error) => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              reject(error.response.status);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              reject(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              reject(error.message);
            }
            reject();
          });
      });
    },

    refreshToken({ state, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: state.refreshToken,
        })).then((response) => {
          console.log(response);
          commit('login', response.data);
          dispatch('setAuthHeader');
          resolve();
        })
          .catch((error) => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              reject(error.response.status);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              reject(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              reject(error.message);
            }
            reject();
          });
      });
    },
  },
};
