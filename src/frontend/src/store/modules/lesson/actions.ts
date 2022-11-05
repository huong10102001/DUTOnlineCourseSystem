import { ActionTypes } from '@/types/store/ActionTypes'
import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import LessonService from "@/services/course/LessonService";

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
  [ActionTypes.FETCH_LESSON_DETAIL](
    { commit }: AugmentedActionContext,
    data: any
  ): any,

  [ActionTypes.CREATE_LESSON](
    { commit }: AugmentedActionContext,
    data: any
  ): any,

  [ActionTypes.UPDATE_LESSON](
    { commit }: AugmentedActionContext,
    data: any
  ): any
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FETCH_LESSON_DETAIL]({ commit }, data) {
    let lesson_data: any = await LessonService.getDetail(data.course_id, data.chapter_id, data.lesson_id)
    return lesson_data
  },

  async [ActionTypes.CREATE_LESSON]({ commit }, data) {
    let response: any = await LessonService.create(data)
    return response
  },

  async [ActionTypes.UPDATE_LESSON]({ commit }, data) {
    let response: any = await LessonService.update(data)
    return response
  }
}
