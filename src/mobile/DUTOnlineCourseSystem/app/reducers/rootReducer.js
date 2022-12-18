import { combineReducers } from 'redux';
import authReducer from './authReducer';
import registerReducer  from './registerReducer';
import coursesReducer from './coursesReducer';
import userReducer from './userReducer';
import lessonReducer from './lessonReducer';
import courseProcessReducer from './courseProcessReducer';
import coursesProcessListReducer from './coursesProcessListReducer';
import courseReducer from './courseReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  regis: registerReducer,
  course: courseReducer,
  courses: coursesReducer,
  user: userReducer,
  lesson: lessonReducer,
  courseProcess: courseProcessReducer,
  coursesProcessList: coursesProcessListReducer,
});

export default rootReducer;