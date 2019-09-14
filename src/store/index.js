import { applyMiddleware, createStore , compose } from 'redux';

import { createLogger } from 'redux-logger';
import rootReducer from './../reducers/rootReducer';
import rootSaga from './../sagas';
import createSagaMiddleware from 'redux-saga';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

// fot redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, sagaMiddleware)));

sagaMiddleware.run(rootSaga);
export default store;
