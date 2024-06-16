import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeRoutes from '@/home/router/HomeRoutes'

const routes: Array<RouteRecordRaw> = [
  ...HomeRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
