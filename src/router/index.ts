import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const SITE = 'Dulce Tentación'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Cambios de query en la misma página (búsqueda/filtros) no deben mover el scroll
    if (to.path === from.path) return false
    // Esperar a que termine la transición de página de App.vue
    return new Promise((resolve) => {
      setTimeout(() => resolve(savedPosition ?? { top: 0 }), 150)
    })
  },
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
      meta: { title: 'Menú' },
    },
    {
      // El título lo pone la vista con el nombre del producto
      path: '/productos/:slug',
      name: 'producto-detalle',
      component: () => import('../views/ProductoDetalleView.vue'),
    },
    {
      path: '/historia',
      name: 'historia',
      component: () => import('../views/HistoryView.vue'),
      meta: { title: 'Nuestra historia' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: 'Página no encontrada' },
    },
  ],
})

router.afterEach((to) => {
  if (to.name === 'producto-detalle') return
  document.title = to.meta.title
    ? `${to.meta.title} · ${SITE}`
    : `${SITE} · Café y repostería artesanal`
})

export default router
