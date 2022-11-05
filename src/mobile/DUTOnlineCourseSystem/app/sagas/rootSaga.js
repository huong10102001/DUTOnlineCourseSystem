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
import get_user from './userSaga';
import update_profile_api from "./updateProfileSaga";
import enroll_course from "./processSaga"
import fetch_lesson from "./lessonSaga"; 
import discussion_api from "./discussionSaga"
import course_process_api from "./course_process/courseProcessRootSaga";
import course_api from "./course/courseRootSaga";
const sagas = function*() {
    yield takeLatest("USER_LOGIN_REQUEST",fetch_login);
    yield takeLatest("REGISTER_HANDLE",register_api);
    yield takeLatest("GET_USER",get_user);
    yield takeLatest("UPDATE_PROFILE_USER",update_profile_api);
    yield takeLatest("ENROLL_COURSE",enroll_course);
    yield takeEvery("GET_LESSON",fetch_lesson);
    yield fork(discussion_api);
    yield fork(course_process_api);
    yield fork(course_api)
};
export default sagas;
