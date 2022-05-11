// noinspection JSCheckFunctionSignatures

import { createRouter, createWebHistory } from 'vue-router';
import { loadLanguageAsync, getClientLocale } from '../i18n';
import Home from '@/views/Home/HomePage.vue';
import EmailVerification from '@/views/EmailVerification/EmailVerificationPage.vue';
import PageNotFound from '@/views/PageNotFound/PageNotFound.vue';

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
  path: '/terms',
  name: 'TermsOfUse',
  component: () => import(/* webpackChunkName: "terms" */ '@/views/TermsOfUsePage.vue'),
},
{
  path: '/privacy-policy',
  name: 'PrivacyPolicy',
  component: () => import(/* webpackChunkName: "privacypolicy" */ '@/views/PrivacyPolicyPage.vue'),
},
{
  path: '/recover-password',
  name: 'RecoverPassword',
  component: () => import(/* webpackChunkName: "recoverpassword" */ '@/views/RecoverPassword.vue'),
},
{
  path: '/:catchAll(.*)',
  name: 'NotFound',
  component: PageNotFound,
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  default: Home,
  paramas: {
    lang: 'pl',
  },
});

const initialLocale = getClientLocale() || process.env.VUE_APP_I18N_LOCALE || 'pl';

router.beforeEach((to, _from, next) => {
  const lang = to.params.lang || initialLocale;
  loadLanguageAsync(lang).then(() => next());
});

export default router;
