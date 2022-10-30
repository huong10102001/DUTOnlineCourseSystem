const initState = {
  error:"",
}

const registerReducer = (state = initState, { type, payload }) => {
  console.log(`registerReducer type: ${type} with payload: ${payload}`);
  switch (type) {
    case 'REGISTER_HANDLE':
      return {
        ...state,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
      };
    case 'REGISTER_FAILURE':
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};
export default registerReducer;