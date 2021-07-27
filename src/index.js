import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import App from './routes/App';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);