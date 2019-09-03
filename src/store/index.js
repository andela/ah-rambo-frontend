import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';

const middleware = [ReduxThunk, logger];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer =
  process.env.NODE_ENV === 'development'
    ? composeEnhancers(applyMiddleware(...middleware))
    : applyMiddleware(...middleware);

const store = createStore(reducers, enhancer);

export default store;
