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
import { getCourseProcess, getCourseProcessFailure, getCourseProcessSuccess } from "../../actions/courseProcessAction";
const getToken = (state) => state.auth.access_token;
function* fetch_course_process_api(action) {
  console.log(
    `GET_COURSE_DETAIL_SUCCESS type: ${action.type} with payload: ${action.payload}`
  );
  const token = yield select(getToken);
  try {
    const data = yield axios.get(
      `${BASE_URL}/api/v1/courses/${action.payload.course_id}/process-retrieve/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(data);
    yield put(getCourseProcessSuccess(data.data));
  } catch (error) {
    yield put(getCourseProcessFailure({ error: "Error" }));
    console.log(error);
  }
  return;
}

export default fetch_course_process_api;

