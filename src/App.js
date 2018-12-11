import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Welcome to our team</h1>
          <p>
          <a className="logIn" href="#">Log In</a><b> | </b><a className="signUp" href="#">Sign Up</a>
          </p>
          
        </header>
      </div>
    );
  }
}

export default App;
