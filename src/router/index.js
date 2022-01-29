// noinspection JSCheckFunctionSignatures

import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home/HomePage.vue';
import EmailVerification from '@/views/EmailVerification/EmailVerificationPage.vue';
import PageNotFound from '@/views/PageNotFound/PageNotFound.vue';

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
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
  component: () => import(/* webpackChunkName: "contact" */ '../views/Contact/ContactPage.vue'),
},
{
  path: '/sign-up',
  name: 'SignUp',
  component: () => import(/* webpackChunkName: "signup" */ '../views/SignUp/SignUpPage.vue'),
},
{
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "login" */ '../views/LogIn/LoginPage.vue'),
},
{
  path: '/services',
  name: 'Services',
  component: () => import(/* webpackChunkName: "services" */ '../views/ServicesPage.vue'),
},
{
  path: '/terms',
  name: 'TermsOfUse',
  component: () => import(/* webpackChunkName: "terms" */ '../views/TermsOfUsePage.vue'),
},
{
  path: '/privacy-policy',
  name: 'PrivacyPolicy',
  component: () => import(/* webpackChunkName: "privacypolicy" */ '../views/PrivacyPolicyPage.vue'),
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
});

export default router;
