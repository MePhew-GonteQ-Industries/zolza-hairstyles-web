export default {
  state: {
    navigationStatus: null,
  },
  getters: {
    getNavigationStatus(state) {
      return state.navigationStatus;
    }
  },
  mutations: {
    setNavigationStatus(state, navigationStatus) {
      state.navigationStatus = navigationStatus;
    },
  },
  actions: {},
};
