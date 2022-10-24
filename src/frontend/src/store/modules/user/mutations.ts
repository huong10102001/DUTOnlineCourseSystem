import { MutationTypes } from '@/types/store/MutationTypes'
import { MutationTree } from 'vuex'
import { State } from './state'
import UserInfo from "@/types/user/UserInfo";
import TokenInfo from "@/types/authentication/TokenInfo";

export type Mutations<S = State> = {
  [MutationTypes.SET_USER_INFO](state: S, userInfo: UserInfo): void,
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
}
