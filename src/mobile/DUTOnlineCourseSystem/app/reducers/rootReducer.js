import { combineReducers } from 'redux';
import authReducer from './authReducer';
import registerReducer  from './registerReducer';
import coursesReducer from './coursesReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
  auth:authReducer,
  regis:registerReducer,
  courses:coursesReducer,
  user:userReducer
})

export default rootReducer;