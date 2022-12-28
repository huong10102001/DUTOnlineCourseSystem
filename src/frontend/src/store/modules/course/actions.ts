import { ActionTypes } from '@/types/store/ActionTypes'
import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
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
  [ActionTypes.FETCH_COURSES](
    { commit }: AugmentedActionContext,
    params: any
  ): void,
  [ActionTypes.FETCH_COURSES_LIBRARY](
    { commit }: AugmentedActionContext,
    params: any
  ): void,
  [ActionTypes.FETCH_COURSE_MANAGEMENT](
    { commit }: AugmentedActionContext,
    params: any
  ): void,
  [ActionTypes.FETCH_COURSE_DETAIL](
    { commit }: AugmentedActionContext,
    slug: string
  ): any,
  [ActionTypes.CREATE_COURSE](
    { commit }: AugmentedActionContext,
    formData: FormData
  ): any,
  [ActionTypes.UPDATE_COURSE_INFO](
    { commit }: AugmentedActionContext,
    data: any,
  ): any,
  [ActionTypes.CHANGE_COURSE_STATUS](
    { commit }: AugmentedActionContext,
    data: any,
  ): any,
  [ActionTypes.DELETE_COURSE](
    { commit }: AugmentedActionContext,
    id: string,
  ): any
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FETCH_COURSES]({ commit }, params) {
    let data: any = await CourseService.getAll(params)
    return data
  },

  async [ActionTypes.FETCH_COURSES_LIBRARY]({ commit }, params) {
    let data: any = await CourseService.getLibrary(params)
    return data
  },

  async [ActionTypes.FETCH_COURSE_MANAGEMENT]({ commit }, params) {
    let data: any = await CourseService.get_course_management(params)
    return data
  },

  async [ActionTypes.FETCH_COURSE_DETAIL]({ commit }, slug) {
    let data: any = await CourseService.getDetail(slug)
    return data
  },

  async [ActionTypes.CREATE_COURSE]({ commit }, formData) {
    let data: any = await CourseService.create(formData)
    return data
  },

  async [ActionTypes.UPDATE_COURSE_INFO]({ commit }, payload) {
    let data: any = await CourseService.update(payload.form, payload.id)
    return data
  },

  async [ActionTypes.CHANGE_COURSE_STATUS]({ commit }, data) {
    let response: any = await CourseService.changeStatus(data)
    return response
  },

  async [ActionTypes.DELETE_COURSE]({ commit }, id) {
    let response: any = await CourseService.delete(id)
    return response
  },
}
