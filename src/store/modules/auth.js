import axios from 'axios';
import { handleRequestError } from '@/utils';

export default {
  state: {
    accessToken: '',
    refreshToken: '',
    refreshTokenInterceptor: null,
    tokenRefreshStarted: false,
    rememberUser: true,
  },

  getters: {
    isAuthenticated(state) {
      return !!(state.accessToken && state.axiosInterceptor !== null);
    },
  },

  mutations: {
    login(state, authData) {
      state.accessToken = authData.accessToken ? authData.accessToken : authData.access_token;
      state.refreshToken = authData.refreshToken ? authData.refreshToken : authData.refresh_token;
    },

    logout(state) {
      state.accessToken = '';
      state.refreshToken = '';
    },

    setRefreshTokenInterceptor(state, interceptor) {
      state.refreshTokenInterceptor = interceptor;
    },

    setTokenRefreshStarted(state, newValue) {
      state.tokenRefreshStarted = newValue;
    },

    setRememberUser(state, newValue) {
      state.rememberUser = newValue;
    },
  },

  actions: {
    setAuthHeader({ state }) {
      axios.defaults.headers.common.Authorization = `Bearer ${state.accessToken}`;
    },

    removeAuthHeader() {
      axios.defaults.headers.common.Authorization = '';
    },

    async addRefreshTokenInterceptor({ state, commit, dispatch }) {
      const refreshTokenInterceptor = axios.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;
          if (originalRequest && error.response && error.response.status === 401) {
            if (!state.tokenRefreshStarted) {
              await dispatch('refreshToken');
            }
          }
          throw new Error(error);
        },
      );
      commit('setRefreshTokenInterceptor', refreshTokenInterceptor);
    },

    removeRefreshTokenInterceptor({ state, commit }) {
      axios.interceptors.response.eject(state.refreshTokenInterceptor);
      commit('setRefreshTokenInterceptor', null);
    },

    async configureAxiosAuthorized({ state, dispatch }) {
      await dispatch('setAuthHeader');
      if (!state.refreshTokenInterceptor) {
        await dispatch('addRefreshTokenInterceptor');
      }
    },

    async configureAxiosUnauthorized({ dispatch }) {
      await dispatch('removeAuthHeader');
      await dispatch('removeRefreshTokenInterceptor');
    },

    saveAuthData({ state }) {
      localStorage.setItem('accessToken', JSON.stringify(
        state.accessToken,
      ));

      if (state.rememberUser) {
        localStorage.setItem('refreshToken', JSON.stringify(
          state.refreshToken,
        ));
      }
    },

    async loadAuthData({ commit, dispatch }) {
      const authData = {
        accessToken: JSON.parse(localStorage.getItem('accessToken')),
        refreshToken: JSON.parse(localStorage.getItem('refreshToken')),
      };
      if (authData.accessToken !== null && authData.refreshToken !== null) {
        commit('login', authData);
        await dispatch('configureAxiosAuthorized');
        await dispatch('checkUserData');
      }
    },

    async deleteAuthData({ commit, dispatch }) {
      commit('logout');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      await dispatch('deleteUserData');
    },

    async login({ commit, dispatch }, userData) {
      try {
        const response = await axios.post('auth/login', new URLSearchParams({
          grant_type: 'password',
          username: userData.email,
          password: userData.password,
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        commit('login', response.data);
        await dispatch('saveAuthData');
        await dispatch('configureAxiosAuthorized');
        await dispatch('checkUserData');
      } catch (error) {
        const errorStatus = handleRequestError(error);
        if (errorStatus === 404) {
          throw new Error(error);
        }
      }
    },

    async logout({ dispatch }) {
      try {
        await axios.post('auth/logout');
        await dispatch('deleteAuthData');
        await dispatch('configureAxiosUnauthorized');
      } catch (error) {
        handleRequestError(error);
      }
    },

    async refreshToken({ state, commit, dispatch }) {
      commit('setTokenRefreshStarted', true);
      try {
        const response = await axios.post('auth/refresh-token', new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: state.refreshToken,
        }));
        await commit('login', response.data);
        await dispatch('saveAuthData');
        await dispatch('configureAxiosAuthorized');
        await dispatch('checkUserData');
        commit('setTokenRefreshStarted', false);
      } catch (error) {
        const errorStatus = handleRequestError(error);
        if (errorStatus === 401 && state.refreshToken === null) {
          await dispatch('logout');
        } else {
          throw new Error(error);
        }
      }
    },
  },
};
