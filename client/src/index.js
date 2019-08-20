import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './views/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import middleware from './middleware';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(reducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
, document.getElementById('root'));