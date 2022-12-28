export const actionLogin = payload => ({
  type: 'HANDLE_LOGIN',
  payload,
});
  
export function loginSuccess(payload) {
  return {
    type: "LOGIN_SUCCESS",
    payload,
  };
}
  
export function loginFailed(payload) {
  return {
    type: "LOGIN_FAILURE",
    payload,
  };
}

export function logout(payload) {
  return {
    type: "LOGOUT",
    payload,
  };
}

export default {
  actionLogin,
  loginSuccess,
  loginFailed,
  logout
};

