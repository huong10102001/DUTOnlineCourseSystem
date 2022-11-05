import {fork,all,takeLatest,takeEvery,putResolve} from "redux-saga/effects";
import fetch_course_detail_api from "./courseSaga";
import fetch_courses_api from "./coursesSaga";
function* course_api(action) {
  yield takeLatest("GET_COURSE", fetch_course_detail_api);
  yield takeLatest("GET_COURSES",fetch_courses_api);
}

export default course_api;