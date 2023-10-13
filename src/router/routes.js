import { createRouter, createWebHistory } from 'vue-router';
// import ErrorPageView from '@/views/common/ErrorPageView.vue';
import CreateExcelView from '../views/CreateExcelView.vue';
import MainView from '../views/MainView.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: '/:pathMatch(.*)',
    //   name: 'not-found',
    //   meta: { requiresAuth: false },
    //   component: ErrorPageView,
    // },
    {
        path: '/create',
        meta: { requiresAuth: false },
        component: CreateExcelView,
      },    
      {
        path: '/',
        name: 'createExcel',
        meta: { requiresAuth: false },
        component: CreateExcelView,
      },
      {
        path: '/sheet',
        name: 'sheet',
        meta: { requiresAuth: false },
        component: MainView,
      },
  ],
})
export default router;
