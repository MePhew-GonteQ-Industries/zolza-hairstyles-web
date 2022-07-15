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
  name: 'Home',
  component: () => import(/* webpackChunkName: "home" */ '@/views/Home/HomePage.vue'),
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/email-verification',
  name: 'EmailVerification',
  component: EmailVerification,
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/contact',
  name: 'Contact',
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
  name: 'SignUp',
  component: () => import(/* webpackChunkName: "signup" */ '@/views/SignUp/SignUpPage.vue'),
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "login" */ '@/views/LogIn/LoginPage.vue'),
  props: loginProps,
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/terms-of-use',
  name: 'TermsOfUse',
  component: () => import(/* webpackChunkName: "terms" */ '@/views/TermsOfUsePage.vue'),
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/privacy-policy',
  name: 'PrivacyPolicy',
  component: () => import(/* webpackChunkName: "privacypolicy" */ '@/views/PrivacyPolicyPage.vue'),
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/cookies-policy',
  name: 'CookiesPolicy',
  component: () => import(/* webpackChunkName: "privacypolicy" */ '@/views/CookiesPolicyPage.vue'),
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/rodo',
  name: 'RodoNotice',
  component: () => import(/* webpackChunkName: "privacypolicy" */ '@/views/RodoNoticePage.vue'),
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/password-reset',
  name: 'ResetPassword',
  component: () => import(/* webpackChunkName: "recoverpassword" */ '@/views/ResetPassword/ResetPassword.vue'),
  meta: {
    requiresAuth: false,
    requiredPermissionLevel: 'user',
  },
  children: [
    {
      path: '',
      component: RequestPasswordReset,
    },
    {
      path: 'change',
      component: ChangePassword,
    },
  ],
},
{
  path: '/settings',
  name: 'SettingsPage',
  component: () => import('@/views/Settings/SettingsPage.vue'),
  meta: {
    requiresAuth: true,
    requiredPermissionLevel: 'user',
  },
},
{
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/views/Dashboard/DashboardPage.vue'),
  meta: {
    requiresAuth: true,
    requiredPermissionLevel: 'admin',
  },
  children: [
    {
      path: '/dashboard',
      component: () => import('@/views/Dashboard/SummaryView.vue'),
      name: 'summaryView',
    },
    {
      path: 'appointments',
      component: () => import('@/views/Dashboard/AppointmentsManagement.vue'),
      name: 'appointmentsManagement',
    },
    {
      path: 'services',
      component: () => import('@/views/Dashboard/ServicesManagement.vue'),
      name: 'servicesManagement',
    },
    {
      path: 'users',
      component: () => import('@/views/Dashboard/UsersManagement.vue'),
      name: 'usersManagement',
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
  path: '/:catchAll(.*)',
  name: 'NotFound',
  component: () => import('@/views/PageNotFound/PageNotFound.vue'),
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  default: Home,
});

router.beforeEach((to) => {
  switch (to.name) {
    case 'Login': {
      if (!store.state.user.loggedIn) {
        return true;
      }
      return { name: 'Home' };
    }
    case 'Dashboard': {
      if (!store.state.user.loggedIn || !store.state.user.userData.permission_level.includes('admin')) {
        return { name: 'Login' };
      }
      return true;
    }
    default: {
      return true;
    }
  }
});

export default router;
