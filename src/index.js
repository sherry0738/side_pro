import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';

// const Main = () => <h1>Hello world</h1>;
// ReactDOM.render (
//   <Router>
//     <Route path="/" component={Main} />
//   </Router>,
//   document.getElementById ('app')
// );
ReactDOM.render (
  <Router>
    <App />
  </Router>,
  document.getElementById ('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister ();
