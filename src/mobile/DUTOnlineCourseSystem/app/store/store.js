import createSagaMiddleware from '@redux-saga/core';
import { createStore, applyMiddleware } from 'redux';
import {rootReducer} from '../reducers/rootReducer';
// import rootSaga from '../sagas/rootSaga';
import sagas from '../sagas/rootSaga';
// import authReducer from "../reducers/authReducer";
const logger = store => next =>action=>{
  console.log("@@State", storeRedux.getState())
  next(action)
  console.log("@@State update", storeRedux.getState())
}

const sagaMiddleware = createSagaMiddleware();
const storeRedux = createStore(rootReducer, applyMiddleware(logger,sagaMiddleware));
sagaMiddleware.run(sagas)

export default storeRedux;