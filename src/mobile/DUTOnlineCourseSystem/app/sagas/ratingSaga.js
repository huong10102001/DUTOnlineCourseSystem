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
import {
  getCourse,
  getCourseSuccess,
  getCourseFailure,
} from "../../actions/courseAction";
import {
  createRating,
  createRatingFailure,
  createRatingSuccess,
} from "../../actions/coursesAction";
const getToken = (state) => state.auth.access_token;
function* create_rating_api(action) {
  const token = yield select(getToken);
  try {
    let response_parent;
    try {
      let response = yield axios.post(
        `${BASE_URL}/api/v1/courses/${action.payload.course_id}/ratings/`,
        {
          title: action.payload.title,
          content: action.payload.content,
          star_rating: action.payload.star_rating,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      response_parent = response;
      yield put(createRatingSuccess());
    } catch (error) {
      yield put(createRatingFailure());
      console.log(error)
    }
    yield put(
      getCourse({
        course_id: action.payload.course_id,
      })
    );
  } catch (error) {
    console.log(error)
  }
  return;
}
export default create_rating_api;
