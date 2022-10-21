import { ActionTypes } from '@/types/store/ActionTypes'
import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import { MutationTypes } from '@/types/store/MutationTypes'
import TokenInfo from "@/types/authentication/TokenInfo";
import AuthenticationService from "@/services/authentication/AuthenticationService";
import LoginItem from "@/types/login/LoginItem";

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
  [ActionTypes.GET_TOKEN_INFO](
    { commit }: AugmentedActionContext,
    payload: TokenInfo
  ): void,

  [ActionTypes.SET_TOKEN_INFO](
    { commit }: AugmentedActionContext,
    payload: TokenInfo
  ): void,

  [ActionTypes.LOGIN](
    { commit }: AugmentedActionContext,
    payload: LoginItem
  ): void,

  [ActionTypes.LOGOUT](
    { commit }: AugmentedActionContext
  ): void,
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.GET_TOKEN_INFO]({ commit }, payload) {
    if (payload) {
      commit(MutationTypes.GET_TOKEN_INFO, payload);
    }
  },

  [ActionTypes.SET_TOKEN_INFO]({ commit }, payload) {
    if (payload) {
      commit(MutationTypes.SET_TOKEN_INFO, payload);
    }
  },

  async [ActionTypes.LOGIN]({ commit }, payload) {
    const token_info: any = await AuthenticationService.login(payload)
    commit(MutationTypes.SET_TOKEN_INFO, {
        access_token: token_info.data.access_token as string,
        refresh_token: token_info.data.refresh_token as string
    });
  },

  [ActionTypes.LOGOUT]({ commit }) {
    commit(MutationTypes.LOGOUT);
    localStorage.clear();
  },
}
