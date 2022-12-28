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
import { getCourses, getCoursesFailure, getCoursesSuccess } from "../../actions/coursesAction";
const getToken = (state) => state.auth.access_token;
function* fetch_courses_api(action){
    console.log(`fetch_course type: ${action.type} with payload: ${action.payload}`);
    const token = yield select(getToken);
    try {
    const data = yield axios.get(`${BASE_URL}/api/v1/courses/`,
    {
       headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    console.log(data)
    yield put(getCoursesSuccess(data.data));
  } catch (error) {
    // yield put(getCoursesFailure(error.response.data));
    console.log(error);
  }
  return;
}
export default fetch_courses_api;