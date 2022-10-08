export const getAllCourses = (payload) => ({
  type: "GET_ALL_COURSES",
  payload,
});

export function getCourseSuccess(payload) {
  return {
    type: "GET_COURSES_SUCCESS",
    payload,
  };
}

export function getCourseFailure(payload) {
  return {
    type: "GET_COURSES_FAILURE",
    payload,
  };
}

export default {
  getAllCourses,
  getCourseSuccess,
  getCourseFailure,
};
