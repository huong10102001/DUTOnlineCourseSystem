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
  console.log(
    `create_rating_api type: ${action.type} with payload: ${action.payload}`
  );
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
      console.log(response);
      response_parent = response;
      yield put(createRatingSuccess());
    } catch (error) {
      yield put(createRatingFailure());
    }
    yield put(
      getCourse({
        course_slug: action.payload.course_slug,
      })
    );
  } catch (error) {}
  return;
}
export default create_rating_api;
