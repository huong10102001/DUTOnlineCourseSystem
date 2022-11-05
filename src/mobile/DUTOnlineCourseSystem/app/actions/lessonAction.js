export function GetLesson(payload) {
  return {
    type: "GET_LESSON",
    payload,
  };
}
export function GetLessonSuccess(payload) {
  return {
    type: "GET_LESSON_SUCCESS",
    payload,
  };
}

export function GetLessonFailure(payload) {
  return {
    type: "GET_LESSON_FAILURE",
    payload,
  };
}
export default {
  GetLesson,
  GetLessonSuccess,
  GetLessonFailure,
};
