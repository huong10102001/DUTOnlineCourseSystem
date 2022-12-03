import {ROLES} from '@/const/roles';

export const ROUTES = {
  LIBRARY: {
    name: 'library',
    path: '/library',
  },

  MY_COURSE: {
    name: 'my-course',
    path: '/my-course',
  },

  COURSE_MANAGEMENT: {
    name: 'course-management',
    path: '/courses/management',
    roles: [ROLES.ADMIN, ROLES.LECTURER]
  },

  REPORT: {
    name: 'report',
    path: '/report',
    roles: [ROLES.ADMIN, ROLES.LECTURER]
  },

  BROWSE: {
    name: 'browse-course',
    path: '/courses/browse',
  },

  COURSE_DETAIL: 'course-detail',
  EDIT_COURSE: 'edit-course',

  LESSON_DETAIL: 'lesson-detail',
  
  TOPICS: '/topics',
  CHAPTERS: '/chapters',
  TOPIC_MANAGEMENT: '/topics/management',

  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register',
}
