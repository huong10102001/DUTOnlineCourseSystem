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
import { getUser } from "../actions/userAction";

function* fetch_login(action) {
  try {
    const payload = action.payload;
    const data = yield axios.post(`${BASE_URL}/api/v1/auth/login/`, {
      email: payload.username,
      password: payload.password,
    });
    yield put(loginSuccess(data.data));
    yield put(getUser());
  } catch (error) {
    yield put(loginFailed(error.response.data));
    console.log(error.response.data);
  }
  return;
}
