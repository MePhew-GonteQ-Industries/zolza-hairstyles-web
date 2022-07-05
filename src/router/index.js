// noinspection JSCheckFunctionSignatures

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
},
{
  path: '/email-verification',
  name: 'EmailVerification',
  component: EmailVerification,
},
{
  path: '/contact',
  name: 'Contact',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "contact" */ '@/views/Contact/ContactPage.vue'),
},
{
  path: '/sign-up',
  name: 'SignUp',
  component: () => import(/* webpackChunkName: "signup" */ '@/views/SignUp/SignUpPage.vue'),
},
{
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "login" */ '@/views/LogIn/LoginPage.vue'),
  props: loginProps,
},
{
  path: '/services',
  name: 'Services',
  component: () => import(/* webpackChunkName: "services" */ '@/views/ServicesPage.vue'),
},
{
  path: '/terms-of-use',
  name: 'TermsOfUse',
  component: () => import(/* webpackChunkName: "terms" */ '@/views/TermsOfUsePage.vue'),
},
{
  path: '/privacy-policy',
  name: 'PrivacyPolicy',
  component: () => import(/* webpackChunkName: "privacypolicy" */ '@/views/PrivacyPolicyPage.vue'),
},
{
  path: '/cookies-policy',
  name: 'CookiesPolicy',
  component: () => import(/* webpackChunkName: "privacypolicy" */ '@/views/CookiesPolicyPage.vue'),
},
{
  path: '/rodo',
  name: 'RodoNotice',
  component: () => import(/* webpackChunkName: "privacypolicy" */ '@/views/RodoNoticePage.vue'),
},
{
  path: '/password-reset',
  name: 'ResetPassword',
  component: () => import(/* webpackChunkName: "recoverpassword" */ '@/views/ResetPassword/ResetPassword.vue'),
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
  path: '/notification-settings',
  name: 'NotificationSettings',
  component: () => import('@/views/NotificationSettings.vue'),
},
{
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/views/Dashboard/DashboardPage.vue'),
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
  if (to.name === 'Login') {
    if (!store.state.user.loggedIn) {
      return true;
    }
    return { name: 'Home' };
  }
  return true;
});

export default router;
