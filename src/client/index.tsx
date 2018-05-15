import * as React from 'react';
import { render } from 'react-dom';
import Routes from './routes/Routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux/store/configure-store';

const rootEl = document.getElementById('root');

render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  rootEl
);
