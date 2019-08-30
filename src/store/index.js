import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';

const middleware = [ReduxThunk];
const composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = process.env.NODE_ENV === 'development'
  ? composeEnhansers(applyMiddleware(...middleware))
  : applyMiddleware(...middleware);

const store = createStore(reducers, enhancer);

export default store;
