import {
  takeLatest,
} from "redux-saga/effects";
import { changePassword } from "../../actions/userAction";
import change_password_saga from "./changePasswordSaga";
import forgot_password_saga from "./forgotPasswordSaga";
import fetch_login from "./loginSaga";
import { noti_saga, noti_change_state_saga } from "./notiSaga";
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
  yield takeLatest("CHANGE_PASSWORD",change_password_saga);
  yield takeLatest("GET_NOTI",noti_saga);
  yield takeLatest("NOTI_CHANGE_STATE",noti_change_state_saga);
  yield takeLatest("FORGOT_PASSWORD",forgot_password_saga);
}

export default user_api;