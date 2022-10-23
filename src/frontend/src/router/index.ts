import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/home/HomePage.vue';
import LoginPage from '@/views/login/LoginPage.vue';
import ProfilePage from '@/views/profile/ProfilePage.vue';
import RegisterPage from '@/views/register/RegisterPage.vue';
import BasePage from "@/views/base/BasePage.vue";
import LibraryPage from "@/views/library/index.vue";
import CourseBasePage from "@/views/course/index.vue";
import CourseDetail from "@/views/course/detail/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: BasePage,
    children: [
      {
        path: 'library',
        name: 'library',
        component: LibraryPage
      },
      {
        path: 'courses',
        name: 'courses',
        component: CourseBasePage,
        children: [
            {
              path: ':slug',
              name: 'course-detail',
              component: CourseDetail
            },
        ]
      },
    ]
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
