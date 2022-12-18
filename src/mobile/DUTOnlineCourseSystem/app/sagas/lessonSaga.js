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
import BASE_URL from "../request/url";
import { GetLesson,GetLessonFailure,GetLessonSuccess } from "../actions/lessonAction";
import authAction from "../actions/authAction";
const getToken = (state) => state.auth.access_token;
function* fetch_lesson(action) {
  console.log(
    `fetch_lesson type: ${action.type} with payload: ${action.payload}`
  );
  const token = yield select(getToken);
  try {
    const response = yield axios.get(`${BASE_URL}/api/v1/courses/${action.payload.course_id}/chapters/${action.payload.chapter_id}/lessons/${action.payload.lesson_id}/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response);
    yield put(GetLessonSuccess(response.data));
  } catch (error) {
    switch (error.status) {
      case 404:
        yield put(GetLessonFailure("Bad request"));
    }
    // yield put(GetLessonFailure(error.response.data));
    console.log(error);
  }
  return;
}
export default fetch_lesson;
