import { BrowserRouter } from "react-router-dom";
import TimeAgo from 'javascript-time-ago'
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';

import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);
