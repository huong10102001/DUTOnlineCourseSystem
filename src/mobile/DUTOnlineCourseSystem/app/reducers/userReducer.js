const userState = {
  id: null,
  full_name: null,
  role: null,
  avatar: null,
  study_at: null,
  is_graduated: false,
  bio: null,
  address: null,
  phone: null,
  birthday: null,
  account: {
    id: null,
    email: null,
    date_joined: null,
  },
  error:null,
};

const userReducer = (state = userState, { type, payload }) => {
  console.log(`userReducer type: ${type} with payload: ${payload}`);
  switch (type) {
    case "GET_USER":
      return {
        ...state,
      };
    case "GET_USER_SUCCESS":
      const {
        id,
        full_name,
        role,
        avatar,
        study_at,
        is_graduated,
        bio,
        address,
        phone,
        birthday,
        account,
      } = payload;
      return {
        ...state,
        id:id,
        full_name: full_name,
        role: role,
        avatar: avatar,
        study_at: study_at,
        is_graduated: is_graduated,
        bio: bio,
        address: address,
        phone: phone,
        birthday: birthday,
        account:{
            id:account.id,
            email:account.email,
            date_joined:account.date_joined
        }
      };
    case "GET_USER_FAILURE":
      return {
        ...state,
        error: payload.detail,
      };
    default:
      return state;
  }
};

export default userReducer;
