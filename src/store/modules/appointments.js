import axios from "axios";

export default {
  state: {
    appointments: [],
  },
  getters: {
    getAppointmentById: (state) => (id) =>
      state.appointments.find((appointment) => appointment.id === id),
  },
  mutations: {
    updateAppointments(state, appointments) {
      state.appointments = appointments;
    },
  },
  actions: {
    async loadAppointments({ commit }, includeArchival) {
      const response = await axios.get(`appointments/all?include_archival=${includeArchival}`);
      commit("updateAppointments", response.data.items);
    },
    deleteAppointments({ commit }) {
      commit("updateAppointments", []);
    },
  },
};
