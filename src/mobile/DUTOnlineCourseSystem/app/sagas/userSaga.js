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
import {getUser,getUserSuccess,getUserFailure} from '../actions/userAction'
const getUserId = (state) => state.auth.user_id;
const getToken = (state) => state.auth.access_token;
function* get_user(action) {
  const user_id = yield select(getUserId);
  const token = yield select(getToken);
  console.log("@@@Userid",user_id)
  try {
    const data = yield axios.get(`http://127.0.0.1:8000/api/v1/users/${user_id}/`,{
       headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    console.log(data);
    yield put(getUserSuccess(data.data));
  } catch (error) {
    // yield put(getUserFailure(error.response.data));
    console.log(error);
  }
  return;
}

export default get_user;
