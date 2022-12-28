import { Alert } from "react-native";

const initState = {
  error: "",
};

const registerReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "REGISTER_HANDLE":
      return {
        ...state,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
      };
    case "REGISTER_FAILURE":
      Alert.alert("Failed", "Email is occupied!");
      return {
        ...state,
      };
      
    case "LOGOUT":
      return {
        initState,
      };
    default:
      return state;
  }
};
export default registerReducer;
