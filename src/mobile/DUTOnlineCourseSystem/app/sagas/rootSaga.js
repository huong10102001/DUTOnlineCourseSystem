import {
  fork,
  all,
  takeLatest,
  takeEvery,
  takeLeading,
  put,
  call,
  take,
} from "redux-saga/effects";
import axios from 'axios';
import { loginFailed, loginSuccess } from '../actions/authAction';
import { registerAction,registerSuccessAction,registerFailureAction } from '../actions/registerAction';
import register_api from './registerSaga';
import fetch_login from './loginSaga';
import fetch_courses from './coursesSaga'
import get_user from './userSaga';
import update_profile_api from "./updateProfileSaga";

const sagas = function*() {
    yield takeLatest("USER_LOGIN_REQUEST",fetch_login);
    yield takeLatest("REGISTER_HANDLE",register_api);
    yield takeLatest("GET_ALL_COURSES",fetch_courses);
    yield takeLatest("GET_USER",get_user);
    yield takeLatest("UPDATE_PROFILE_USER",update_profile_api);
};
export default sagas;
