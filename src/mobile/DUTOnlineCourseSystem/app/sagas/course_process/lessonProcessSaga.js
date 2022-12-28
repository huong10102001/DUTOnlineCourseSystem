const getToken = (state) => state.auth.access_token;
function* update_lesson_process(action) {
  console.log(
    `update_lesson_process type: ${action.type} with payload: ${action.payload}`
  );
  const token = yield select(getToken);
  try {
    let response = yield axios.put(
        `${BASE_URL}/api/v1/courses/${action.payload.course_id}/process-update/`,
        {
            status: action.payload.status,
            lesson_id: action.payload.lesson_id,
            },
            {
            headers: {
                Authorization: "Bearer " + token,
            },
            }
        );
    console.log(response);
    yield put(updateLessonProcessSuccess({status:action.payload.status}))
    } catch (error) {
        console.log(error);
    }
    return;
}
export default update_lesson_process;
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
import BASE_URL from "../../request/url";
import { updateLessonProcessSuccess } from "../../actions/lessonProcessAction";