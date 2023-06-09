import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import HomePage from '@/views/home/index.vue';
import LoginPage from '@/views/login/index.vue';
import ProfilePage from '@/views/profile/index.vue';
import RegisterPage from '@/views/register/index.vue';
import BasePage from "@/views/base/index.vue";
import LibraryPage from "@/views/library/index.vue";
import CourseBasePage from "@/views/course/index.vue";
import CourseDetail from "@/views/course/detail/index.vue";
import AddCoursePage from '@/views/course/add/index.vue';
import LessonBasePage from "@/views/lesson/index.vue";
import LessonDetail from "@/views/lesson/detail/index.vue";
import CourseManagementPage from "@/views/course/management/index.vue";
import EditCoursePage from "@/views/course/edit/index.vue";
import TopicBasePage from "@/views/topic/index.vue";
import TopicManagementPage from "@/views/topic/management/index.vue";
import AddLessonPage from "@/views/lesson/add/index.vue";
import EditLessonPage from "@/views/lesson/edit/index.vue";
import MyCoursePage from "@/views/my-course/index.vue";
import ProfileBasePage from "@/views/profile/index.vue";
import ProfileDetail from "@/views/profile/detail/index.vue";
import ProfileEdit from "@/views/profile/edit/index.vue";
import CertificationPage from '@/views/certification/index.vue';
import ReportPage from "@/views/report/index.vue";
import BrowseCoursePage from "@/views/course/browse/index.vue";


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
        path: 'my-course',
        name: 'my-course',
        component: MyCoursePage
      },
      {
        path: 'courses',
        name: 'courses',
        component: CourseBasePage,
        children: [
          {
            path: 'add',
            name: 'add-course',
            component: AddCoursePage
          },
          {
            path: ':course_slug',
            name: 'course-detail',
            component: CourseDetail,
          },
          {
            path: ':course_slug/edit',
            name: 'edit-course',
            component: EditCoursePage
          },
          {
            path: 'management',
            name: 'course-management',
            component: CourseManagementPage
          },
          {
            path: ':course_slug/chapters/:chapter_slug/lessons',
            name: 'lessons',
            component: LessonBasePage,
            children: [
              {
                path: ':lesson_slug',
                name: 'lesson-detail',
                component: LessonDetail
              },
              {
                path: 'add',
                name: 'add-lesson',
                component: AddLessonPage
              },
              {
                path: ':lesson_slug/edit',
                name: 'edit-lesson',
                component: EditLessonPage
              },
            ]
          },
          {
            path: ':course_slug/certificate',
            name: 'certification',
            component: CertificationPage
          },
          {
            path: 'browse',
            name: 'browse-course',
            component: BrowseCoursePage
          }
        ]
      },
      {
        path: 'categories',
        name: 'categories',
        component: TopicBasePage,
        children: [
          {
            path: 'management',
            name: 'category-management',
            component: TopicManagementPage
          },
        ]
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfileBasePage,
        children: [
          {
            path: '',
            name: 'profile-detail',
            component: ProfileDetail
          },
          {
            path: 'edit',
            name: 'profile-edit',
            component: ProfileEdit
          },
        ]
      },
      {
        path: 'report',
        name: 'overview',
        component: ReportPage
      }
    ]
  },
  {
    path: '/home',
    name: 'homepage',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/logout',
    name: 'logout',
    component: BasePage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {top: 0}
  },
})

export default router
