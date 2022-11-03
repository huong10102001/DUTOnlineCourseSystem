import { ActionTypes } from '@/types/store/ActionTypes'
import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import ChapterService from "@/services/course/ChapterService";

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
  [ActionTypes.CREATE_CHAPTER](
    { commit }: AugmentedActionContext,
    payload: any
  ): any,
  [ActionTypes.REMOVE_CHAPTER](
    { commit }: AugmentedActionContext,
    payload: any
  ): any,
  [ActionTypes.UPDATE_CHAPTER](
    { commit }: AugmentedActionContext,
    payload: any
  ): any,
  [ActionTypes.FETCH_CHAPTERS](
    { commit }: AugmentedActionContext,
    id: string
  ): any,
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.CREATE_CHAPTER]({ commit }, payload) {
    let response: any = await ChapterService.create(payload.course_id, payload.chapter)
    return response
  },
  async [ActionTypes.REMOVE_CHAPTER]({ commit }, payload) {
    let data: any = await ChapterService.remove(payload.course_id, payload.id)
    return data
  },
  async [ActionTypes.UPDATE_CHAPTER]({ commit }, payload) {
    let data: any = await ChapterService.update(payload.course_id, payload.id, payload.chapter)
    return data
  },
  async [ActionTypes.FETCH_CHAPTERS]({ commit }, id) {
    let data: any = await ChapterService.getAll(id)
    return data
  },
}
