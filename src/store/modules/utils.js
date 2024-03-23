export default {
  state: {
    navigationStatus: null,
    reducedFunctionalityNotification: null,
    cookiesAccepted: false,
    notificationsDenied: false,
  },
  getters: {
    getNavigationStatus(state) {
      return state.navigationStatus;
    },
  },
  mutations: {
    setNavigationStatus(state, navigationStatus) {
      state.navigationStatus = navigationStatus;
    },
    setReducedFunctionalityNotification(state, notification) {
      state.reducedFunctionalityNotification = notification;
    },
    setCookiesState(state, newValue) {
      state.cookiesAccepted = newValue;
    },
    setNotificationsDeniedState(state, newValue) {
      state.notificationsDenied = newValue;
    },
  },
  actions: {
    setCookiesState({ state, commit }, newValue) {
      commit("setCookiesState", newValue);
      localStorage.setItem("cookiesAccepted", JSON.stringify(state.cookiesAccepted));
    },
    loadCookiesState({ commit }) {
      const cookiesAccepted = JSON.parse(localStorage.getItem("cookiesAccepted"));
      commit("setCookiesState", !!cookiesAccepted);
    },
    setNotificationsDeniedState({ state, commit }, newValue) {
      commit("setNotificationsDeniedState", newValue);
      localStorage.setItem("notificationsDenied", JSON.stringify(state.notificationsDenied));
    },
    loadNotificationsDeniedState({ commit }) {
      const notificationsDenied = JSON.parse(localStorage.getItem("notificationsDenied"));
      commit("setNotificationsDeniedState", !!notificationsDenied);
    },
  },
};
