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
    async loadAppointments({ state, commit }) {
      if (!state.appointments.length) {
        const response = await axios.get("appointments/all");
        commit("updateAppointments", response.data.items);
      }
    },
    deleteAppointments({ commit }) {
      commit("updateAppointments", []);
    },
  },
};
