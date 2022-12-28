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
import { getListCoursesProcess, getListCoursesProcessFailure, getListCoursesProcessSuccess } from "../../actions/coursesProcessListAction";
const getToken = (state) => state.auth.access_token;
function* fetch_list_course_process_api(action) {
  console.log(
    `fetch_list_course_process_api type: ${action.type} with payload: ${action.payload}`
  );
  const token = yield select(getToken);
  try {
    const data = yield axios.get(
      `${BASE_URL}/api/v1/courses/process-list/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(data);
    yield put(getListCoursesProcessSuccess(data.data));
  } catch (error) {
    yield put(getListCoursesProcessFailure({ error: "Error" }));
    console.log(error);
  }
  return;
}

export default fetch_list_course_process_api;
