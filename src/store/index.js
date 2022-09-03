import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import user from '@/store/modules/user';
import settings from '@/store/modules/settings';
import sessions from '@/store/modules/sessions';
import users from '@/store/modules/users';
import appointments from '@/store/modules/appointments';
import services from '@/store/modules/services';

export default createStore({
  modules: {
    auth,
    user,
    settings,
    sessions,
    users,
    appointments,
    services,
  },
});
