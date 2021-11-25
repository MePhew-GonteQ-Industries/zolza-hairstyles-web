import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
},
{
  path: '/contact',
  name: 'Contact',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue'),
},
{
  path: '/signup',
  name: 'SignUp',
  component: () => import(/* webpackChunkName: "signup" */ '../views/SignUp.vue'),
},
{
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
},
{
  path: '/services',
  name: 'Services',
  component: () => import(/* webpackChunkName: "services" */ '../views/Services.vue'),
},
{
  path: '/terms',
  name: 'Terms',
  component: () => import(/* webpackChunkName: "terms" */ '../views/Terms.vue'),
},
{
  path: '/privacypolicy',
  name: 'PrivacyPolicy',
  component: () => import(/* webpackChunkName: "privacypolicy" */ '../views/PrivacyPolicy.vue'),
},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
