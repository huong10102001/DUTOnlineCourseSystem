const coursesState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  error: null,
};

const coursesReducer = (state = coursesState, { type, payload }) => {
  console.log(`coursesReducer type: ${type} with payload: ${payload}`);
  switch (type) {
    case "GET_ALL_COURSES":
      return {
        ...state,
      };
    case "GET_COURSES_SUCCESS":
      const { count, next, previous, results } = payload;
      return {
        ...state,
        count: count,
        next: next,
        previous: previous,
        results: results,
      };
    case "GET_COURSES_FAILURE":
      return {
        ...state,
        error: payload.detail,
      };
    case "LOGOUT":
      return coursesState
    default:
      return state;
    }
};
export default coursesReducer;
