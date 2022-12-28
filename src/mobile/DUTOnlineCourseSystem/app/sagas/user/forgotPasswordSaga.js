import { put, select } from "redux-saga/effects";
import axios from "axios";
import BASE_URL from "../../request/url";
import { Alert } from "react-native";
function* forgot_password_saga(action) {
  try {
    console.log(action.payload.email)
    const response = yield axios.post(
      `${BASE_URL}/api/v1/auth/forgot-password/`,
      {
        email: action.payload.email,
      },
    );
    Alert.alert("Success", "Check your mail");
  } catch (error) {
    console.log(error);
    if (error.response.data) {
      Alert.alert("Error", "Email don't exist");
    } else {
      Alert.alert("Error", "Error please do again");
    }
  }
  return;
}

export default forgot_password_saga;