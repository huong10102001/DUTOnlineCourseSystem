import { createStore } from 'vuex'
import { authentication } from "@/store/modules/authentication";
import { course } from "@/store/modules/course";
import { topic } from "@/store/modules/topic";
import { chapter } from "@/store/modules/chapter";
import { lesson } from "@/store/modules/lesson";
import { user } from  "@/store/modules/user";
import { courseProcess } from "@/store/modules/courseProcess";
import { lessonProcess } from "@/store/modules/lessonProcess";
import { discussion } from './modules/discussion';
import { rating } from './modules/rating'
import { quiz } from './modules/quiz'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    is_loading: false
  },
  getters: {
  },
  mutations: {
    SET_LOADING(state, status) {
      state.is_loading = status
    }
  },
  actions: {
  },
  modules: {
    authentication,
    course,
    user,
    topic,
    chapter,
    lesson,
    courseProcess,
    lessonProcess,
    discussion,
    rating,
    quiz
  }
})
