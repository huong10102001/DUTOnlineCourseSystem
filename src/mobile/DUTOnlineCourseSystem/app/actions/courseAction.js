export const getCourse = (payload) => ({
  type: "GET_COURSE",
  payload,
});

export function getCourseSuccess(payload) {
  return {
    type: "GET_COURSE_DETAIL_SUCCESS",
    payload,
  };
}

export function getCourseFailure(payload) {
  return {
    type: "GET_COURSE_DETAIL_FAILURE",
    payload,
  };
}

export default {
  getCourse,
  getCourseSuccess,
  getCourseFailure,
};
