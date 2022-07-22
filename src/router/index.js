import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/index';
import Home from '@/views/Home/HomePage.vue';
import EmailVerification from '@/views/EmailVerification/EmailVerificationPage.vue';
import RequestPasswordReset from '@/views/ResetPassword/RequestPasswordReset.vue';
import ChangePassword from '@/views/ResetPassword/ChangePassword.vue';

function loginProps(route) {
  if (route.params) {
    return {
      emailConfirmed: Boolean(route.params.emailConfirmed),
      accountCreated: Boolean(route.params.accountCreated),
      email: route.params.email,
    };
  }
  return null;
}

const routes = [{
  path: '/',
  name: 'home',
  component: () => import(/* webpackChunkName: "home" */ '@/views/Home/HomePage.vue'),
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/email-verification',
  name: 'emailVerification',
  component: EmailVerification,
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/contact',
  name: 'contact',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "contact" */ '@/views/Contact/ContactPage.vue'),
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/sign-up',
  name: 'signUp',
  component: () => import(/* webpackChunkName: "signup" */ '@/views/SignUp/SignUpPage.vue'),
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/login',
  name: 'login',
  component: () => import(/* webpackChunkName: "login" */ '@/views/LogIn/LoginPage.vue'),
  props: loginProps,
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/terms-of-use',
  name: 'termsOfUse',
  component: () => import(/* webpackChunkName: "terms" */ '@/views/TermsOfUsePage.vue'),
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/privacy-policy',
  name: 'privacyPolicy',
  component: () => import(/* webpackChunkName: "privacypolicy" */ '@/views/PrivacyPolicyPage.vue'),
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/cookies-policy',
  name: 'cookiesPolicy',
  component: () => import(/* webpackChunkName: "privacypolicy" */ '@/views/CookiesPolicyPage.vue'),
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/rodo',
  name: 'rodoNotice',
  component: () => import(/* webpackChunkName: "privacypolicy" */ '@/views/RodoNoticePage.vue'),
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/password-reset',
  component: () => import(/* webpackChunkName: "recoverpassword" */ '@/views/ResetPassword/ResetPassword.vue'),
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
  children: [
    {
      path: '',
      component: RequestPasswordReset,
      name: 'resetPassword',
    },
    {
      path: 'change',
      component: ChangePassword,
    },
  ],
},
{
  path: '/settings',
  component: () => import('@/views/Settings/SettingsPage.vue'),
  meta: {
    requiresAuth: true,
    requiredPermissionLevel: 'user',
  },
  children: [
    {
      path: '',
      redirect: { name: 'userAccountSettings' },
      name: 'settings',
    },
    {
      path: 'account',
      component: () => import('@/views/Settings/UserAccountSettings.vue'),
      name: 'userAccountSettings',
    },
    {
      path: 'account-security',
      component: () => import('@/views/Settings/AccountSecuritySettings.vue'),
      name: 'accountSecuritySettings',
    },
    {
      path: 'notifications',
      component: () => import('@/views/Settings/NotificationsSettings.vue'),
      name: 'notificationsSettings',
    },
    {
      path: 'theme',
      component: () => import('@/views/Settings/ThemeSettings.vue'),
      name: 'themeSettings',
    },
    {
      path: 'language',
      component: () => import('@/views/Settings/LanguageSettings.vue'),
      name: 'languageSettings',
    },
  ],
},
{
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/views/Dashboard/DashboardPage.vue'),
  meta: {
    requiresAuth: true,
    requiredPermissionLevel: 'admin',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/Dashboard/SummaryView.vue'),
      name: 'summaryView',
    },
    {
      path: 'appointments',
      component: () => import('@/views/Dashboard/AppointmentsManagement.vue'),
      name: 'appointmentsManagement',
    },
    {
      path: 'appointment/:id',
      component: () => import('@/views/Dashboard/AppointmentView.vue'),
    },
    {
      path: 'services',
      component: () => import('@/views/Dashboard/ServicesManagement.vue'),
      name: 'servicesManagement',
    },
    {
      path: 'service/:id',
      component: () => import('@/views/Dashboard/ServiceView.vue'),
    },
    {
      path: 'users',
      component: () => import('@/views/Dashboard/UsersManagement.vue'),
      name: 'usersManagement',
    },
    {
      path: 'user/:id',
      component: () => import('@/views/Dashboard/UserView.vue'),
    },
    {
      path: 'work-hours',
      component: () => import('@/views/Dashboard/WorkHoursManagement.vue'),
      name: 'workHoursManagement',
    },
    {
      path: 'stats',
      component: () => import('@/views/Dashboard/StatsView.vue'),
      name: 'statsView',
    },
    {
      path: 'settings',
      component: () => import('@/views/Dashboard/ServiceSettings.vue'),
      name: 'serviceSettings',
    },
  ],
},
{
  path: '/insufficient-permissions',
  name: 'insufficientPermissions',
  component: () => import('@/views/InsufficientPermissionsPage.vue'),
},
{
  path: '/:catchAll(.*)',
  name: 'notFound',
  component: () => import('@/views/PageNotFound/PageNotFound.vue'),
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  default: Home,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    if (!store.state.user.userData) {
      return { name: 'login' };
    }
    switch (to.meta.requiredPermissionLevel) {
      case 'admin': {
        if (!store.state.user.userData.permission_level.includes('admin')) return { name: 'insufficientPermissions' };
        break;
      }
      case 'owner': {
        if (!store.state.user.userData.permission_level.includes('owner')) return { name: 'insufficientPermissions' };
        break;
      }
      default: {
        break;
      }
    }
  }

  return true;
});

export default router;
