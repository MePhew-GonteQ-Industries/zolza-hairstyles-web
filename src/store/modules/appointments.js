import axios from 'axios';
import { handleRequestError } from '@/utils';

export default {
  state: {
    appointments: [],
  },
  getters: {
    getAppointmentById: (state) => (id) => state.appointments.find(
      (appointment) => appointment.id === id,
    ),
  },
  mutations: {
    updateAppointments(state, appointments) {
      state.appointments = appointments;
    },
  },
  actions: {
    async loadAppointments({ state, commit }) {
      if (!state.appointments.length) {
        try {
          const response = await axios.get('appointments/all?limit=6');
          commit('updateAppointments', response.data.items);
        } catch (error) {
          handleRequestError(error);
        }
      }
    },
    deleteAppointments({ commit }) {
      commit('updateSessions', []);
    },
  },
};
