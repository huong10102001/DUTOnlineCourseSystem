import { put, select } from "redux-saga/effects";
import axios from "axios";
import BASE_URL from "../../request/url";
import { Alert } from "react-native";
const getToken = (state) => state.auth.access_token;
function* change_password_saga(action) {
  const token = yield select(getToken);
  try {
    const response = yield axios.post(
      `${BASE_URL}/api/v1/users/change-password/`,
      {
        old_password: action.payload.old_password,
        new_password: action.payload.new_password,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    Alert.alert('Success','Change password success')
  } catch (error) {
    console.log(error);
    if(error.response.data){
      Alert.alert("Error", "Incorrect password");
    }else{
      Alert.alert("Error", "Error please do again");
    }

  }
  return;
}

export default change_password_saga;
