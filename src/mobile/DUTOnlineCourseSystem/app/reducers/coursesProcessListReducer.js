const coursesState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  error: null,
};

const coursesProcessListReducer = (state = coursesState, { type, payload }) => {
  switch (type) {
    case "GET_LIST_COURSES_PROCESS":
      return {
        ...state,
      };
    case "GET_LIST_COURSES_PROCESS_SUCCESS":
      const { count, next, previous, results } = payload;
      return {
        ...state,
        results: results,
      };
    case "GET_LIST_COURSES_PROCESS_FAILURE":
      return {
        ...state,
        error: payload.error,
      };
    case "LOGOUT":
      return coursesState;
    default:
      return state;
  }
};
export default coursesProcessListReducer;
