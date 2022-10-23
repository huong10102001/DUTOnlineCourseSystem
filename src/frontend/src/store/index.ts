import { createStore } from 'vuex'
import { authentication } from "@/store/modules/authentication";
import { courses } from "@/store/modules/course";
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
    courses
  }
})
