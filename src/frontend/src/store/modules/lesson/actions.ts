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
    payload: any
  ): any,
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FETCH_LESSON_DETAIL]({ commit }, payload) {
    console.log(payload)
    let data: any = await LessonService.getDetail(payload.course_id, payload.chapter_id, payload.id)
    return data
  },
 
}
