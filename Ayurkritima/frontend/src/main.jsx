import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContextProvider from './context/Context';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store'; // Import the Redux store

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Provider>
);