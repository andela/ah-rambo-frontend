import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/index.scss';

const root = document.getElementById('root');
ReactDOM.render(<App />, root);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App');
}
