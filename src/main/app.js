import React from 'react';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';

import Router from './router';
import reducers from './reducers';
import '../styles/app.scss';

/* eslint-disable no-underscore-dangle */
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = applyMiddleware(multi, promise, thunk)(createStore)(reducers, devTools);

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
