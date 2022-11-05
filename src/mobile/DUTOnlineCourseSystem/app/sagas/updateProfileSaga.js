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
import {
  updateProfileUserFailure,
  updateProfileUserSuccess,
} from "../actions/userAction";
import BASE_URL from "../request/url";
const getToken = (state) => state.auth.access_token;
const getuser = (state) => state.user;
function* update_profile_api(action) {
  const payload = action.payload;
  console.log("@@@@", action.payload);
  const token = yield select(getToken);
  const user = yield select(getuser);
  try {
    const response = yield axios.patch(
      `${BASE_URL}/api/v1/users/${user.id}/`,
      {
          full_name: payload.full_name,
          birthday: payload.day,
          bio: payload.bio,
      },
      {
        headers: {
          "Authorization": "Bearer " + token,
        }
      },
    );
    console.log("@@@data",response.data);
    yield put(updateProfileUserSuccess(response.data));
  } catch (error) {
    // yield put(updateProfileUserFailure(error.response.data));
    console.error(error);
  }
  return;
}
export default update_profile_api;
