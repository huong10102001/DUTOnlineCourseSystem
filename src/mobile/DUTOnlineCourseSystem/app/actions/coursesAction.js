export const getCourses = (payload) => ({
  type: "GET_COURSES",
  payload,
});

export function getCoursesSuccess(payload) {
  return {
    type: "GET_COURSES_SUCCESS",
    payload,
  };
}

export function getCoursesFailure(payload) {
  return {
    type: "GET_COURSES_FAILURE",
    payload,
  };
}
export const createRating = (payload) => ({
  type: "CREATE_RATING",
  payload,
});
export const createRatingSuccess = (payload) => ({
  type: "CREATE_RATING_SUCCESS",
  payload,
});
export const createRatingFailure = (payload) => ({
  type: "CREATE_RATING_FAILURE",
  payload,
});
export default {
  getCourses,
  getCoursesSuccess,
  getCoursesFailure,
  createRating,
  createRatingSuccess,
  createRatingFailure,
};
