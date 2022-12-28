import { ActionTypes } from '@/types/store/ActionTypes'
import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import ReportService from "@/services/report/ReportService";

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
  [ActionTypes.FETCH_ADMIN_REPORT_TOP_USER](
    { commit }: AugmentedActionContext,
  ): void,
  [ActionTypes.FETCH_LECTURER_REPORT](
    { commit }: AugmentedActionContext,
  ): void,
  [ActionTypes.FETCH_ADMIN_REPORT_COURSE](
    { commit }: AugmentedActionContext,
    params: any
  ): void,
  [ActionTypes.FETCH_ADMIN_REPORT_USER](
    { commit }: AugmentedActionContext,
    params: any
  ): void,
  [ActionTypes.FETCH_LECTURER_REPORT_COURSE](
    { commit }: AugmentedActionContext,
    id: string
  ): void,
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FETCH_ADMIN_REPORT_TOP_USER]({ commit }) {
    let response: any = await ReportService.get_admin_report_top_user()
    return response
  },
  async [ActionTypes.FETCH_LECTURER_REPORT]({ commit }) {
    let response: any = await ReportService.get_lecturer_report()
    return response
  },
  async [ActionTypes.FETCH_ADMIN_REPORT_COURSE]({ commit }, params) {
    let response: any = await ReportService.get_admin_report_course(params)
    return response
  },
  async [ActionTypes.FETCH_ADMIN_REPORT_USER]({ commit }, params) {
    let response: any = await ReportService.get_admin_report_user(params)
    return response
  },
  async [ActionTypes.FETCH_LECTURER_REPORT_COURSE]({ commit }, id) {
    let response: any = await ReportService.get_lecturer_course_report(id)
    return response
  },
}
