export const getCourseProcess = (payload) => ({
  type: "GET_COURSE_PROCESS",
  payload,
});

export function getCourseProcessSuccess(payload) {
  return {
    type: "GET_COURSE_PROCESS_SUCCESS",
    payload,
  };
}

export function getCourseProcessFailure(payload) {
  return {
    type: "GET_COURSE_PROCESS_FAILURE",
    payload,
  };
}

export default {
  getCourseProcess,
  getCourseProcessSuccess,
  getCourseProcessFailure,
};
