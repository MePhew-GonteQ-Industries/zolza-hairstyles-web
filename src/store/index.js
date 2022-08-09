import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import user from '@/store/modules/user';
import settings from '@/store/modules/settings';
import sessions from '@/store/modules/sessions';

export default createStore({
  modules: {
    auth,
    user,
    settings,
    sessions,
  },
});
