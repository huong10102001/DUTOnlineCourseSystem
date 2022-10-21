export const state = {
  tokenInfo: {
    access_token: "",
    refresh_token: "",
    exp: 0,
    iat: 0,
    user_id: "",
  }
}

export type State = typeof state
