const coursesState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  error: null,
};

const coursesReducer = (state = coursesState, { type, payload }) => {
  switch (type) {
    case "GET_COURSES":
      return {
        ...state,
      };
    case "GET_COURSES_SUCCESS":
      const { count, next, previous, results } = payload;
      return {
        ...state,
        results: results,
      };
    case "GET_COURSES_FAILURE":
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
export default coursesReducer;
