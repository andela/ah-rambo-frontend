import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import './styles/index.scss';

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App');
}
