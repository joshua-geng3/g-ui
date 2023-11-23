import Layout from '../layouts/index.vue';
import demoRoutes from './demoRoutes';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    component: <h1>123</h1>,
  },
  {
    path: '/components',
    component: Layout,
    children: [
      {
        path: 'overview:lang(.*)',
        component: () => import('../views/ComponentOverview.vue'),
      },
      ...demoRoutes,
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  fallback: false,
  routes,
  scrollBehavior: to => {
    if (to.hash) {
      return { el: to.hash, top: 80, behavior: 'auto' };
    }
  },
});
