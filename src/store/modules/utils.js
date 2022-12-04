export default {
  state: {
    navigationStatus: null,
  },
  getters: {
    getNavigationStatus(state) {
      return state.navigationInProgress;
    }
  },
  mutations: {
    setNavigationStatus(state, navigationStatus) {
      state.navigationInProgress = navigationStatus;
    },
  },
  actions: {},
};
