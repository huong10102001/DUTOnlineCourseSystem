export const registerAction = payload =>({
  type: "REGISTER_HANDLE",
  payload
});
export const registerSuccessAction = payload => ({
  type: 'REGISTER_SUCCESS',
  payload,
});
export const registerFailureAction = payload => ({
  type: 'REGISTER_FAILURE',
  payload,
});

export default{
  registerAction, 
  registerSuccessAction,
  registerFailureAction,
}