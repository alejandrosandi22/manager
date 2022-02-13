import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import firebase from 'firebase/compat/app';
import environment from './environments/environment'
import environmentProd from './environments/environment.prod';
import { BrowserRouter } from 'react-router-dom';

const production = false;

if (production) {
  firebase.initializeApp(environmentProd.firebaseConfigProd);
} else {
  firebase.initializeApp(environment.firebaseConfig);
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
