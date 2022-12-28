import { Alert } from "react-native";

const initState = {
  noti_number: "",
  key:"",
  notifications:[]
};

const notiReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "UPDATE_NOTI_NUMBER":
      return {
        ...state,
        noti_number: payload.noti_number,
      };
    case "UPDATE_KEY":
      console.log(payload.noti_number);
      return {
        ...state,
        key: payload.key,
      };
    case "GET_NOTIFICATION_SUCCESS":
      console.log(payload)
      return {
        ...state,
        notifications:payload
      };
    case "LOGOUT":
      return {
        initState,
      };
    default:
      return state;
  }
};
export default notiReducer;
