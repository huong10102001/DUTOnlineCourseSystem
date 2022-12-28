import {
  fork,
  all,
  takeLatest,
  takeEvery,
  put,
  call,
  take,
  putResolve,
  select
} from "redux-saga/effects";
import axios from "axios";
import { loginFailed, loginSuccess } from "../actions/authAction";
import {
  registerAction,
  registerSuccessAction,
  registerFailureAction,
} from "../actions/registerAction";
import { getUser } from "../actions/userAction";
import { getAllCourses } from "../actions/courseProcessAction";
import BASE_URL from "../request/url";
const getToken = (state) => state.auth.access_token;
function* enroll_course(action){
    console.log(
    `enroll_course type: ${action.type} with payload: ${action.payload}`
    );
    const token = yield select(getToken);
    try {
    const data = yield axios.get(`${BASE_URL}/api/v1/courses/${action.payload}/process-retrieve/`,
    {
       headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    yield put(getAllCourses());
  } catch (error) {
    console.log(error);
  }
  return;
}
function* enroll_course2(action) {
  console.log(
    `enroll_course type: ${action.type} with payload: ${action.payload}`
  );
  const token = yield select(getToken);
  try {
    const data = yield axios.get(
      `${BASE_URL}/api/v1/courses/${action.payload}/process-retrieve/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log(data)
    // yield put(getCourseSuccess(data.data));
  } catch (error) {
    // yield put(getCourseFailure(error.response.data));
    // console.log(error);
  }
  return;
}
export default enroll_course;