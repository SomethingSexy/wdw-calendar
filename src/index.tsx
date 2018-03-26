import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import Store from './stores/index';
import './theme.css';

const store = Store();

ReactDOM.render(
  <Provider {...store}>
    <Application />
  </Provider>
, document.getElementById('app'));
