import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/home/HomePage.vue'
import BasePage from "@/views/base/BasePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: BasePage
  },
  {
    path: '/home',
    name: 'index',
    component: HomePage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
