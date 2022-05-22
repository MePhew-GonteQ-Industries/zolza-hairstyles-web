import axios from 'axios';

export default {
  state: {
    loggedIn: false,
    accessToken: '',
    refreshToken: '',
    userData: {
      email: '',
      name: '',
      surname: '',
      gender: '',
      verified: false,
      permission_level: [],
      created_at: null,
    },
  },

  getters: {
  },

  mutations: {
    login(state, loginData) {
      state.loggedIn = true;
      state.accessToken = loginData.access_token;
      state.refreshToken = loginData.refresh_token;
    },

    logout(state) {
      state.loggedIn = false;
      state.accessToken = '';
      state.refreshToken = '';
    },

    setUserData(state, userData) {
      console.log(userData);
      state.userData = userData;
    },
  },

  actions: {
    checkUserData({ commit }) {
      axios.get('users/me').then((response) => {
        commit('setUserData', response.data);
      })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            switch (error.response.status) {
              case 404: {
                // message.value = 'Incorrect user data';
                break;
              }
              default: {
                console.error(error.response.status);
                break;
              }
            }
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },

    setAuthHeader({ state }) {
      axios.defaults.headers.common.Authorization = `Bearer ${
        state.accessToken}`;
    },

    login({ commit, dispatch }, userData) {
      return new Promise((resolve, reject) => {
        axios.post('auth/login', new URLSearchParams({
          grant_type: 'password',
          username: userData.email,
          password: userData.password,
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then((response) => {
          console.log(response);
          commit('login', response.data);
          dispatch('setAuthHeader');
          dispatch('checkUserData');
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

    logout({ commit }) {
      commit('logout');
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
