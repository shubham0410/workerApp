import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers/store';
import { App } from 'App/App';

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

// setup fake backend
import { configureFakeBackend } from './helpers/fake-backend';
configureFakeBackend();

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('app')
);

