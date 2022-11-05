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

export default {
  getCourses,
  getCoursesSuccess,
  getCoursesFailure,
};
