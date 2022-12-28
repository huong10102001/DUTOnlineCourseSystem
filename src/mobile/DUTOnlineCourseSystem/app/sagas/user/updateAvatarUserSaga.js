import { put, select } from "redux-saga/effects";
import axios from "axios";
import {
  updateAvatarUserSuccess,
  updateAvatarUserFailure,
} from "../../actions/userAction";
import BASE_URL from "../../request/url";
import { getUser } from "../../actions/userAction";
const getToken = (state) => state.auth.access_token;
const getuser = (state) => state.user;
function* update_avatar_user_api(action) {
  const payload = action.payload;
  const token = yield select(getToken);
  const user = yield select(getuser);
  console.log(action.payload.data);
  try {
    const response = yield axios.put(
      `${BASE_URL}/api/v1/users/${user.id}/`,
      action.payload.data,
      {
        headers: {
          "Content-Type": "multipart/form-data" ,
          "Authorization": "Bearer " + token,
        },
      }
    );
    yield put(getUser());
  } catch (error) {
    console.error(error);
  }
  return;
}
export default update_avatar_user_api;
