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

import { getAllCourses,getCourseFailure,getCourseSuccess } from "../actions/courseAction";
import authAction from "../actions/authAction";
const getToken = (state) => state.auth.access_token;
function* fetch_courses(action){
    console.log(`fetch_course type: ${action.type} with payload: ${action.payload}`);
    const token = yield select(getToken);
    try {
    const data = yield axios.get("http://127.0.0.1:8000/api/v1/courses/",
    {
       headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    console.log(data)
    yield put(getCourseSuccess(data.data));
    console.log("@@@@@email", email);
  } catch (error) {
    yield put(getCourseFailure(error.response.data));
    console.log(error.response.data);
  }
  return;
}
export default fetch_courses;