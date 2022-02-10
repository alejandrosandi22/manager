import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/compat/app';
import environment from './environments/environment'
import environmentProd from './environments/environment.prod';

const production = false;

if (production) {
  firebase.initializeApp(environmentProd.firebaseConfigProd);
} else {
  firebase.initializeApp(environment.firebaseConfig);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
