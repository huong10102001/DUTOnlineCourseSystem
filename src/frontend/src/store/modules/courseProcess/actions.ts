import { ActionTypes } from '@/types/store/ActionTypes'
import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import CourseProcessService from "@/services/process/CourseProcessService";
import CourseService from "@/services/course/CourseService";

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
  [ActionTypes.FETCH_COURSES_PROCESS](
    { commit }: AugmentedActionContext,
  ): void,
  [ActionTypes.FETCH_COURSE_PROCESS_DETAIL](
    { commit }: AugmentedActionContext,
    id: string
  ): any,
  [ActionTypes.CREATE_COURSE_PROCESS](
    { commit }: AugmentedActionContext,
    payload: any
  ): any,
  [ActionTypes.FETCH_USER_COURSES_PROCESS](
    { commit }: AugmentedActionContext,
    params: any
  ): any,


  // [ActionTypes.UPDATE_COURSE_INFO](
  //   { commit }: AugmentedActionContext,
  //   data: any,
  // ): any,
  // [ActionTypes.DELETE_COURSE](
  //   { commit }: AugmentedActionContext,
  //   id: string,
  // ): any
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FETCH_COURSES_PROCESS]({ commit }) {
    let data: any = await CourseProcessService.getAll()
    return data
  },

  async [ActionTypes.FETCH_COURSE_PROCESS_DETAIL]({ commit }, id) {
    let data: any = await CourseProcessService.getDetail(id)
    return data
  },

  async [ActionTypes.CREATE_COURSE_PROCESS]({ commit }, payload) {
    let data: any = await CourseProcessService.create(payload)
    return data
  },

  async [ActionTypes.FETCH_USER_COURSES_PROCESS]({ commit }, params) {
    let data: any = await CourseService.getUserProcesses(params)
    return data
  },

  // async [ActionTypes.UPDATE_COURSE_INFO]({ commit }, payload) {
  //   let data: any = await CourseService.update(payload.form, payload.id)
  //   return data
  // },
  // async [ActionTypes.DELETE_COURSE]({ commit }, id) {
  //   let response: any = await CourseService.delete(id)
  //   return response
  // },
}
