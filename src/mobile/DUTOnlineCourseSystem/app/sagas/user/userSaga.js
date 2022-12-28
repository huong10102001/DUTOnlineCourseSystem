import {
  put,
  select,
} from "redux-saga/effects";
import axios from "axios";
import {getUser,getUserSuccess,getUserFailure} from '../../actions/userAction';
import BASE_URL from "../../request/url";
const getUserId = (state) => state.auth.user_id;
const getToken = (state) => state.auth.access_token;
function* get_user(action) {
  const user_id = yield select(getUserId);
  const token = yield select(getToken);
  try {
    const data = yield axios.get(`${BASE_URL}/api/v1/users/${user_id}/`,{
       headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    console.log(data);
    yield put(getUserSuccess(data.data));
  } catch (error) {
    console.log(error);
  }
  return;
}

export default get_user;
