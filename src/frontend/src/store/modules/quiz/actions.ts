import { ActionTypes } from '@/types/store/ActionTypes'
import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import QuizService from "@/services/quiz/QuizService";
import QuizResultService from "@/services/quiz/QuizResultService";

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
  [ActionTypes.CREATE_QUIZ](
    { commit }: AugmentedActionContext,
    payload: any
  ): void,

  [ActionTypes.UPDATE_QUIZ](
    { commit }: AugmentedActionContext,
    payload: any,
  ): any,

  [ActionTypes.CREATE_QUIZ_RESULT](
    { commit }: AugmentedActionContext,
    payload: any
  ): void,

  [ActionTypes.UPDATE_QUIZ_RESULT](
    { commit }: AugmentedActionContext,
    payload: any,
  ): any,
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.CREATE_QUIZ]({ commit }, payload) {
    let response: any = await QuizService.create(payload)
    return response
  },

  async [ActionTypes.UPDATE_QUIZ]({ commit }, payload) {
    let response: any = await QuizService.update(payload)
    return response
  },

  async [ActionTypes.CREATE_QUIZ_RESULT]({ commit }, payload) {
    let response: any = await QuizResultService.create(payload)
    return response
  },

  async [ActionTypes.UPDATE_QUIZ_RESULT]({ commit }, payload) {
    let response: any = await QuizResultService.update(payload)
    return response
  },
}
