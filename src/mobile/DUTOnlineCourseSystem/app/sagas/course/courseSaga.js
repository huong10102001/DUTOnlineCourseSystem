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
import authAction from "../../actions/authAction";
import { getCourse, getCourseSuccess,getCourseFailure } from "../../actions/courseAction";
const getToken = (state) => state.auth.access_token;
function* fetch_course_detail_api(action) {
  console.log(
    `fetch_course_detail type: ${action.type} with payload: ${action.payload}`
  );
  const token = yield select(getToken);
  try {
    const data = yield axios.get(`${BASE_URL}/api/v1/courses/${action.payload.course_slug}/content/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(data);
    yield put(getCourseSuccess(data.data));
  } catch (error) {
    yield put(getCourseFailure({error:"ERROR"}));
    console.log(error);
  }
  return;
}
export default fetch_course_detail_api;
