import { applyMiddleware, createStore } from 'redux';

import { createLogger } from 'redux-logger';
import rootReducer from './../reducers/rootReducer';
import rootSaga from './../sagas';
import createSagaMiddleware from 'redux-saga';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(rootSaga);
export default store;
