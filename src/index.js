import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'

import reportWebVitals from './reportWebVitals';
import configureStore from './store/store'
import storeProvider from './store/storeProvider'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));

storeProvider.init(configureStore);
const store = storeProvider.getStore();

root.render(
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>,
);

reportWebVitals();
