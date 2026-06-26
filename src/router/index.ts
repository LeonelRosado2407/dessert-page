import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/productos',
      name: 'productos',
      component: () => import('../views/ProductosView.vue'),
    },
    {
      path: '/productos/:slug',
      name: 'producto-detalle',
      component: () => import('../views/ProductoDetalleView.vue'),
    },
    {
      path: '/historia',
      name: 'historia',
      component: () => import('../views/HistoryView.vue'),
    },
  ],
})

export default router
