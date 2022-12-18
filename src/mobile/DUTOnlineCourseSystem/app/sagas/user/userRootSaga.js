import {
  takeLatest,
} from "redux-saga/effects";
import fetch_login from "./loginSaga";
import register_api from "./registerSaga";
import update_avatar_user_api from "./updateAvatarUserSaga";
import update_profile_api from "./updateProfileSaga";
import get_user from "./userSaga";

function* user_api(action) {
  yield takeLatest("USER_LOGIN_REQUEST",fetch_login);
  yield takeLatest("REGISTER_HANDLE",register_api); 
  yield takeLatest("GET_USER",get_user);
  yield takeLatest("UPDATE_PROFILE_USER",update_profile_api);
  yield takeLatest("UPDATE_AVATAR_USER",update_avatar_user_api);
}

export default user_api;