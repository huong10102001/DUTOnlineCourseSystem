import { ActionTypes } from '@/types/store/ActionTypes'
import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import TopicService from "@/services/course/TopicService";

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
  [ActionTypes.FETCH_TOPICS](
    { commit }: AugmentedActionContext,
    params: any
  ): void,

}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FETCH_TOPICS]({ commit }, params) {
    let data: any = await TopicService.getAll(params)
    return data
  }
}
