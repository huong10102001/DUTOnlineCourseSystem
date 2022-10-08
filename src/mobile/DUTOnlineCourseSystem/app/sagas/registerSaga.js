import {
  fork,
  all,
  takeLatest,
  takeEvery,
  put,
  call,
  take,
  putResolve,
} from "redux-saga/effects";
import axios from "axios";
import { loginFailed, loginSuccess } from "../actions/authAction";
import {
  registerAction,
  registerSuccessAction,
  registerFailureAction,
} from "../actions/registerAction";

function* register_api(action) {
  console.log("@@@@", action.payload);
  let register_url = "";
  if (action.payload.role == "user") {
    register_url = "http://127.0.0.1:8000/api/v1/auth/registers/user";
  } else {
    register_url = "http://127.0.0.1:8000/api/v1/auth/registers/lecturer";
  }
  try {
    const payload = action.payload;
    console.log("@@@@", payload);
    const data = yield axios.post(register_url, {
      username: " ",
      full_name: action.payload.full_name,
      email: action.payload.email,
      password: action.payload.password,
    });
    // const { email,access_token,refeshtoken } = data.data;
    yield putResolve(registerSuccessAction(data.data));
    yield put({
      type: "USER_LOGIN_REQUEST",
      payload: {
        username: action.payload.email,
        password: action.payload.password,
      },
    });
  } catch (error) {
    yield putResolve(registerFailureAction(error.response.data));
    console.log(error.response.data);
    return;
  }
}

export default register_api;