const courseState = {
  id: "",
  title: "",
  summary: "",
  description: "",
  background: "",
  slug: "",
  status: "",
  user: {},
  topics: [],
  chapter_ids: [],
  chapters: [{
    id:"",
    lessons:[{
      attachment:"",
      attachment_id:"",
      chapter_id:"",
      content:"",
      discussions:[],
      id:"",
      previous_lesson:undefined,
    }]
  }],
  isLoading:false
};

const courseReducer = (state = courseState, { type, payload }) => {
  console.log(`coursesReducer type: ${type} with payload: ${payload}`);
  switch (type) {
    case "GET_COURSE_DETAIL":
      return {
        ...state,
        isLoading:true
      };
    case "GET_COURSE_DETAIL_SUCCESS":
      const {
        id,
        title,
        summary,
        description,
        background,
        slug,
        status,
        user,
        topics,
        chapter_ids,
        chapters,
      } = payload;
      return {
        ...state,
        id: id,
        title: title,
        summary: summary,
        description: description,
        background: background,
        slug: slug,
        status: status,
        user: user,
        topics: topics,
        chapter_ids: chapter_ids,
        chapters: chapters,
        isLoading:false,
      };
    case "GET_COURSE_DETAIL_FAILURE":
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };
    case "LOGOUT":
      return courseState;
    default:
      return state;
  }
};
export default courseReducer;
