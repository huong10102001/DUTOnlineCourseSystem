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
// function* login_request(state) {
//   console.log("@@@@ loginrequest");
//   const payload = state.payload;
//   return yield axios
//     .post("http://127.0.0.1:8000/auth/login", {
//       email: payload.username,
//       password: payload.password,
//     })
//     .then((response) => {
//       console.log("@@@@@@");
//       console.log(response);
//     })
//     .catch((error) => {});
// }
function* fetch_login(action) {
  try {
    const payload = action.payload;
    const data = yield axios.post("http://127.0.0.1:8000/api/v1/auth/login/", {
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

export default fetch_login;