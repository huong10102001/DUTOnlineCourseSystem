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
  [ActionTypes.FETCH_COURSE_DETAIL](
    { commit }: AugmentedActionContext,
    slug: string
  ): any,

}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FETCH_COURSES]({ commit }, params) {
    let data: any = await CourseService.getAll(params)
    return data
  },

  async [ActionTypes.FETCH_COURSE_DETAIL]({ commit }, slug) {
    let data: any = await CourseService.getDetail(slug)
    return data
  },
}
