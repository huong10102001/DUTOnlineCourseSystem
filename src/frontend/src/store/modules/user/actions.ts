import { ActionTypes } from '@/types/store/ActionTypes'
import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import UserService from "@/services/user/UserService";
import {MutationTypes} from "@/types/store/MutationTypes";
import UserInfo from "@/types/user/UserInfo";

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
  [ActionTypes.GET_USER_INFO](
    { commit }: AugmentedActionContext,
    user_id: string
  ): void,
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GET_USER_INFO]({ commit }, user_id) {
    let response: any = await UserService.getUserInfo(user_id)
    if (response?.status == 200) {
      let user: UserInfo = {
        full_name: response.data.full_name,
        role: response.data.role,
        avatar: response.data.avatar,
        bio: response.data.avatar,
      }
      commit(MutationTypes.SET_USER_INFO, user);
    }
    return response
  },
}
