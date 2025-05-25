import React from 'react';
import { createRoot } from 'react-dom/client';  // Correct import for React 18
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

const container = document.getElementById('root');


const root = createRoot(container);


root.render(
  <Provider store={store}>
    <App />
  </Provider>
);