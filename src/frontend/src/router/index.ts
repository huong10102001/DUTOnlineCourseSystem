import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/home/HomePage.vue';
import LoginPage from '@/views/login/LoginPage.vue';
import ProfilePage from '@/views/profile/ProfilePage.vue';
import RegisterPage from '@/views/register/RegisterPage.vue';
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
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
