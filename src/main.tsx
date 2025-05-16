import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import NotFaq from './app/NotFaq.tsx';
import { store } from './app/store.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NotFaq />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
