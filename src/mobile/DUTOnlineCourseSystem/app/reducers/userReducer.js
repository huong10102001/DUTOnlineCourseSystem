import { Alert } from "react-native";

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
  isLoading:false
};

const userReducer = (state = userState, { type, payload }) => {
  console.log(`userReducer type: ${type} with payload: ${payload}`);
  switch (type) {
    case "GET_USER":
      return {
        ...state,
        isLoading:true
      };
    case "GET_USER_SUCCESS":
      let {
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
        id: id,
        full_name: full_name,
        role: role,
        avatar: avatar,
        study_at: study_at,
        is_graduated: is_graduated,
        bio: bio,
        address: address,
        phone: phone,
        birthday: birthday,
        account: {
          id: account.id,
          email: account.email,
          date_joined: account.date_joined,
        },
        error: null,
        isLoading:false
      };
    case "GET_USER_FAILURE":
      return {
        ...state,
        error: payload.detail,
        isLoading:false
      };
    case "UPDATE_PROFILE_USER":
      return {
        ...state,
        isLoading:true
      };
    case "UPDATE_PROFILE_USER_SUCCESS":
      console.log("@@@@UPDATE",payload)
      Alert.alert("Success","Update Success")
      return {
        ...state,
        id: payload.id,
        full_name: payload.full_name,
        role: payload.role,
        avatar: payload.avatar,
        study_at: payload.study_at,
        is_graduated: payload.is_graduated,
        bio: payload.bio,
        address: payload.address,
        phone: payload.phone,
        birthday: payload.birthday,
        account: {
          email: payload.account.email,
          date_joined: payload.account.date_joined,
        },
        error: "",
        isLoading:false
      };
    case "UPDATE_PROFILE_USER_FAILURE":
      return {
        ...state,
        error: payload.detail,
        isLoading:false
      };
    case "RESET_ERROR":
      return{
        ...state,
        error:"",
      }
    case "LOGOUT":
      return userState;
    default:
      return state;
  }
};

export default userReducer;
