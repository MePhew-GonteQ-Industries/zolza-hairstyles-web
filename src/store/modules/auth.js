import axios from "axios";

import { handleRequestError } from "@/utils";

export default {
  state: {
    accessToken: "",
    refreshToken: "",
    refreshTokenInterceptor: null,
    rememberUser: true,
    sessionId: "",
    sudoModeActivated: "",
    sudoModeExpires: "",
  },

  getters: {
    isAuthenticated(state) {
      if (!state.accessToken) return false;
      if (!state.sessionId) return false;
      if (state.axiosInterceptor === null) return false;
      return true;
    },
    sudoModeActive(state) {
      if (!state.sudoModeActivated) return false;
      if (!state.sudoModeExpires) return false;
      const sudoModeExpires = new Date(state.sudoModeExpires);
      if (sudoModeExpires > new Date()) return false;
      return true;
    },
  },

  mutations: {
    login(state, authData) {
      state.accessToken = authData.accessToken ? authData.accessToken : authData.access_token;
      state.refreshToken = authData.refreshToken ? authData.refreshToken : authData.refresh_token;
      state.sessionId = authData.session.id;
      state.sudoModeActivated = authData.sudoModeActivated;
      state.sudoModeExpires = authData.sudoModeExpires;
    },

    logout(state) {
      state.accessToken = "";
      state.refreshToken = "";
    },

    setRefreshTokenInterceptor(state, interceptor) {
      state.refreshTokenInterceptor = interceptor;
    },

    setRememberUser(state, newValue) {
      state.rememberUser = newValue;
    },

    setSudoMode(state, newValue) {
      state.sudoModeActivated = newValue.sudo_mode_activated;
      state.sudoModeExpires = newValue.sudo_mode_expires;
    },
  },

  actions: {
    setAuthHeader({ state }) {
      axios.defaults.headers.common.Authorization = `Bearer ${state.accessToken}`;
    },

    removeAuthHeader() {
      axios.defaults.headers.common.Authorization = "";
    },

    async addRefreshTokenInterceptor({ state, commit, dispatch }) {
      const refreshTokenInterceptor = axios.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;
          if (originalRequest) {
            const { response } = error;
            if (response) {
              if (
                response.status === 401 &&
                response.data &&
                error.response.data.detail === "Could not validate credentials"
              ) {
                if (!originalRequest.retry) {
                  originalRequest.retry = true;
                  await dispatch("refreshToken");
                  originalRequest.headers.Authorization = `Bearer ${state.accessToken}`;
                  return axios(originalRequest);
                }
              }
            }
          }
          throw error;
        }
      );
      commit("setRefreshTokenInterceptor", refreshTokenInterceptor);
    },

    removeRefreshTokenInterceptor({ state, commit }) {
      axios.interceptors.response.eject(state.refreshTokenInterceptor);
      commit("setRefreshTokenInterceptor", null);
    },

    async configureAxiosAuthorized({ state, dispatch }) {
      await dispatch("setAuthHeader");
      if (!state.refreshTokenInterceptor) {
        await dispatch("addRefreshTokenInterceptor");
      }
    },

    async configureAxiosUnauthorized({ dispatch }) {
      await dispatch("removeAuthHeader");
      await dispatch("removeRefreshTokenInterceptor");
    },

    saveAuthData({ state }) {
      localStorage.setItem("accessToken", JSON.stringify(state.accessToken));

      localStorage.setItem("sessionId", JSON.stringify(state.sessionId));

      if (state.rememberUser) {
        localStorage.setItem("refreshToken", JSON.stringify(state.refreshToken));
      }
    },

    saveSudoModeData({ state }) {
      localStorage.setItem("sudoModeActivated", JSON.stringify(state.sudoModeActivated));

      localStorage.setItem("sudoModeExpires", JSON.stringify(state.sudoModeExpires));
    },

    async loadAuthData({ commit, dispatch }) {
      const authData = {
        accessToken: JSON.parse(localStorage.getItem("accessToken")),
        refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
        session: {
          id: JSON.parse(localStorage.getItem("sessionId")),
        },
        sudoModeActivated: JSON.parse(localStorage.getItem("sudoModeActivated")),
        sudoModeExpires: JSON.parse(localStorage.getItem("sudoModeExpires")),
      };
      if (authData.accessToken !== null && authData.session.id !== null) {
        commit("login", authData);
        await dispatch("configureAxiosAuthorized");
        try {
          await dispatch("checkUserData");
          await dispatch("loadSettings");
        } catch (err) {
          console.error(err);
          dispatch("logout");
          dispatch("loadDefaultSettings");
        }
      } else {
        dispatch("loadDefaultSettings");
      }
    },

    async deleteAuthData({ commit, dispatch }) {
      commit("logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("sessionId");
      await dispatch("deleteUserData");
    },

    async login({ commit, dispatch }, userData) {
      try {
        const response = await axios.post(
          "auth/login",
          new URLSearchParams({
            grant_type: "password",
            username: userData.email,
            password: userData.password,
          })
        );
        commit("login", response.data);
        await dispatch("saveAuthData");
        await dispatch("configureAxiosAuthorized");
        commit("setUserData", response.data.session.user);
        await dispatch("loadSettings");
      } catch (error) {
        const { status } = handleRequestError(error);
        if (status === 404 || !status) {
          throw error;
        }
      }
    },

    async logout({ dispatch }) {
      try {
        await axios.post("auth/logout");
        await dispatch("deleteAuthData");
        await dispatch("configureAxiosUnauthorized");
      } catch (error) {
        const { status } = handleRequestError(error);
        if (status === 401 || status === 404) {
          await dispatch("deleteAuthData");
          await dispatch("configureAxiosUnauthorized");
        }
      }
    },

    async refreshToken({ state, commit, dispatch }) {
      try {
        const response = await axios.post(
          "auth/refresh-token",
          new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: state.refreshToken,
          })
        );
        await commit("login", response.data);
        await dispatch("saveAuthData");
        await dispatch("configureAxiosAuthorized");
        commit("setUserData", response.data.session.user);
        await dispatch("loadSettings");
      } catch (error) {
        const { status } = handleRequestError(error);
        if (status === 401 && state.refreshToken === null) {
          await dispatch("logout");
        }
      }
    },

    async enterSudoMode({ commit, dispatch }, password) {
      try {
        const response = await axios.post(
          "auth/enter-sudo-mode",
          new URLSearchParams({
            password,
          })
        );
        commit("setSudoMode", response.data);
        await dispatch("saveSudoModeData");
      } catch (error) {
        const { status } = handleRequestError(error);
        if (status === 404) {
          throw error;
        }
      }
    },
  },
};
