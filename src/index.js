import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';
//import './styles/app.scss';
//import './styles/app2.scss';
import App from './App';
import configureStore from './ducks/configureStore';
import * as serviceWorker from './serviceWorker';

const fontUrl =
  'https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Dawning+of+a+New+Day&family=Dr+Sugiyama&family=Homemade+Apple&family=Just+Another+Hand&family=La+Belle+Aurore&family=Nothing+You+Could+Do&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&family=Rock+Salt&family=Tinos:ital,wght@0,400;0,700;1,400;1,700&family=Zeyada&display=swap';
const fontLink = document.createElement('link');
fontLink.setAttribute('href', fontUrl);
fontLink.setAttribute('rel', 'stylesheet');
const head = document.getElementsByTagName('head')[0];
head.prepend(fontLink);

const iconUrl = 'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined';
const iconLink = document.createElement('link');
iconLink.setAttribute('href', iconUrl);
iconLink.setAttribute('rel', 'stylesheet');
head.prepend(iconLink);

const link = document.createElement('link');
link.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
link.setAttribute('rel', 'stylesheet');
link.setAttribute(
  'integrity',
  'sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u',
);
link.setAttribute('crossorigin', 'anonymous');
head.prepend(link);

const script = document.createElement('script');
script.setAttribute('src', 'https://use.fontawesome.com/releases/v5.0.6/js/all.js');
head.prepend(script);

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('app'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
