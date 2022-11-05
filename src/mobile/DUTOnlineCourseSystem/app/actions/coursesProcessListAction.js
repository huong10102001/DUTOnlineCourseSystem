export const getListCoursesProcess = (payload) => ({
  type: "GET_LIST_COURSES_PROCESS",
  payload,
});

export function getListCoursesProcessSuccess(payload) {
  return {
    type: "GET_LIST_COURSES_PROCESS_SUCCESS",
    payload,
  };
}

export function getListCoursesProcessFailure(payload) {
  return {
    type: "GET_LIST_COURSES_PROCESS_FAILURE",
    payload,
  };
}

export default {
  getListCoursesProcessFailure,
  getListCoursesProcessSuccess,
  getListCoursesProcess,
};
