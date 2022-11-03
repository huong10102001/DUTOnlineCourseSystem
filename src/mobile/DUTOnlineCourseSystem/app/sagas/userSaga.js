import {
  fork,
  all,
  takeLatest,
  takeEvery,
  put,
  call,
  take,
  putResolve,
  select,
} from "redux-saga/effects";
import axios from "axios";
import {getUser,getUserSuccess,getUserFailure} from '../actions/userAction';
import BASE_URL from "../request/url";
const getUserId = (state) => state.auth.user_id;
const getToken = (state) => state.auth.access_token;
function* get_user(action) {
  const user_id = yield select(getUserId);
  const token = yield select(getToken);
  console.log("@@@Userid",user_id)
  try {
    const response = yield axios.get(`${BASE_URL}/api/v1/users/${user_id}/`,{
       headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    console.log(response);
    yield put(getUserSuccess(response.data));
  } catch (error) {
    yield put(getUserFailure(error.response.data));
    console.log(error);
  }
  return;
}

export default get_user;
