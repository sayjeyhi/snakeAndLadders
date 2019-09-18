import { applyMiddleware, createStore , compose } from 'redux';

import { createLogger } from 'redux-logger';
import rootReducer from './../reducers/rootReducer';
import rootSaga from './../sagas';
import createSagaMiddleware from 'redux-saga';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

// fot redux dev tools
const windowGlobal = typeof window !== 'undefined' && window;

const devtools =
  process.env.NODE_ENV === 'development' && windowGlobal.devToolsExtension
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;

const store = createStore(
	rootReducer, 
	compose(
		applyMiddleware(logger, sagaMiddleware),
		devtools
	)
);

sagaMiddleware.run(rootSaga);
export default store;
