import { ActionTypes } from '@/types/store/ActionTypes'
import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import LessonProcessService from "@/services/process/LessonProcessService";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>,

  commit<K extends keyof Mutations>(
    key: K
  ): ReturnType<Mutations[K]>,

} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  // [ActionTypes.FETCH_COURSES_PROCESS](
  //   { commit }: AugmentedActionContext,
  // ): void,
  [ActionTypes.FETCH_LESSON_PROCESS_DETAIL](
    { commit }: AugmentedActionContext,
    payload: any
  ): any,
  [ActionTypes.UPDATE_LESSON_PROCESS](
    { commit }: AugmentedActionContext,
    payload: any,
  ): any,
  // [ActionTypes.DELETE_COURSE](
  //   { commit }: AugmentedActionContext,
  //   id: string,
  // ): any
}

export const actions: ActionTree<State, State> & Actions = {
  // async [ActionTypes.FETCH_COURSES_PROCESS]({ commit }) {
  //   let data: any = await LessonProcessService.getAll()
  //   return data
  // },

  async [ActionTypes.FETCH_LESSON_PROCESS_DETAIL]({ commit }, payload) {
    let data: any = await LessonProcessService.getDetail(payload.course_process_id, payload.id)
    return data
  },

  async [ActionTypes.UPDATE_LESSON_PROCESS]({ commit }, payload) {
    let data: any = await LessonProcessService.update(payload.course_process_id, payload.id, payload.data)
    return data
  },

  // async [ActionTypes.DELETE_COURSE]({ commit }, id) {
  //   let response: any = await CourseService.delete(id)
  //   return response
  // },
}
