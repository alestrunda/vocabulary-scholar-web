/*global window document*/

import React from 'react';

import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import throttle from 'lodash.throttle';
import App from './App';
import { loadStore, saveStore } from './storage';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  loadStore(store);
});
store.subscribe(
  throttle(() => {
    saveStore(store);
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
