import {
  fork,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";
import enroll_course from "./processSaga"
import fetch_lesson from "./lessonSaga"; 
import discussion_api from "./discussionSaga"
import course_process_api from "./course_process/courseProcessRootSaga";
import course_api from "./course/courseRootSaga";
import user_api from "./user/userRootSaga";
const sagas = function*() {
    yield takeLatest("ENROLL_COURSE",enroll_course);
    yield takeEvery("GET_LESSON",fetch_lesson);
    yield fork(discussion_api);
    yield fork(course_process_api);
    yield fork(course_api)
    yield fork(user_api)
};
export default sagas;
