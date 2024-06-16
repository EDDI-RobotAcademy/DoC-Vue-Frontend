import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeRoutes from '@/home/router/HomeRoutes'
import ProductRoutes from '@/product/router/ProductRoutes'

const routes: Array<RouteRecordRaw> = [
  ...HomeRoutes,
  ...ProductRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
