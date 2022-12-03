import { ActionTypes } from '@/types/store/ActionTypes'
import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import ReportService from "@/services/report/ReportService";
import NotificationService from "@/services/notification/NotificationService";

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
  [ActionTypes.FETCH_NOTIFICATION](
    { commit }: AugmentedActionContext,
    params: any
  ): void,
  [ActionTypes.CHANGE_NOTIFICATIONS_STATE](
    { commit }: AugmentedActionContext,
    params: any
  ): void,
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FETCH_NOTIFICATION]({ commit }, params) {
    let response: any = await NotificationService.getAll(params)
    return response
  },

  async [ActionTypes.CHANGE_NOTIFICATIONS_STATE]({ commit }, params=null) {
    let response: any = await NotificationService.changeState(params)
    return response
  },
}
