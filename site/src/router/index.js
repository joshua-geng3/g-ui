import Layout from '../layouts/index.vue';
import demoRoutes from './demoRoutes';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
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
  {
    path: '/tooltip',
    component: () => import('../../../components/tooltip/demo/basic.vue'),
  },
  {
    path: '/select',
    component: () => import('../../../components/select/demo/basic.vue'),
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
