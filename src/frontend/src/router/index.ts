import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/home/index.vue';
import LoginPage from '@/views/login/index.vue';
import ProfilePage from '@/views/profile/index.vue';
import RegisterPage from '@/views/register/index.vue';
import BasePage from "@/views/base/index.vue";
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
