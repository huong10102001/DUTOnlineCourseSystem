const initState = {
  user_id:"",
  access_token:"",
  refresh_token:"",
  isLogin:false,
  error:null,
  user:{

  }
}

const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "LOGIN_HANDLE":
      return {
        ...state,
      };
    case "LOGIN_SUCCESS":
      const { user_id, access_token, refresh_token } = payload;
      return {
        ...state,
        access_token: access_token,
        refresh_token: refresh_token,
        user_id: user_id,
        isLogin: true,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLogin: false,
        error: payload.details,
      };
    case "LOGOUT":
      return initState;
    default:
      return state;
  }
};

export default authReducer;