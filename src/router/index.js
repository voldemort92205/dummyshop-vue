import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue';
import ProductsView from '../components/ProductsView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/products',
        name: 'products',
        component: ProductsView,
    },
  ]
})

export default router