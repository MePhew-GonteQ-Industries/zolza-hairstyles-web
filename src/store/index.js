import { createStore } from 'vuex';
import user from '@/store/modules/user';
import settings from '@/store/modules/settings';

export default createStore({
  modules: {
    user,
    settings,
  },
});
