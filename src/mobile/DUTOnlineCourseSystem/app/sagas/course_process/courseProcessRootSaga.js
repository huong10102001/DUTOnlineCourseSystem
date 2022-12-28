import {
  takeLatest,
} from "redux-saga/effects";
import fetch_course_process_api from "./courseProcessSaga";
import fetch_list_course_process_api from "./coursesProcessListSaga";
import update_lesson_process from "./lessonProcessSaga";
import submit_quiz from "./quizSaga";

function* course_process_api(action) {
  yield takeLatest("GET_COURSE_PROCESS", fetch_course_process_api);
  yield takeLatest("GET_LIST_COURSES_PROCESS",fetch_list_course_process_api);
  yield takeLatest("UPDATE_LESSON_PROCESS",update_lesson_process);
  yield takeLatest("SUBMIT_QUIZ",submit_quiz);

}

export default course_process_api;