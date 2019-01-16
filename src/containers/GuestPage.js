import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import {getTokenObj} from './../utils/AuthUtils';
// import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import './GuestPage.css';

export default class GuestPage extends Component {
  constructor (props) {
    super (props);

    this.state = {
      isLoggedIn: false,
      avatarUrl: '',
    };
  }

  render () {
    if (Boolean (this.props.isLoggedIn)) {
      console.log ('user logged in');
      // this.props.history.push ('/guest');
    }
    const onSuccess = response => {
      // this.props.hasAuth ();
      setTimeout (() => this.props.hasAuth (), 1000);
      localStorage.setItem ('auth', JSON.stringify (response.tokenObj));
      this.props.history.push ('/');
    };

    const onFailure = () => {
      this.setState ({isLoggedIn: this.props.isLoggedIn});
      if (localStorage.getItem ('auth')) {
        localStorage.removeItem ('auth');
      }
    };

    return (
      <div className="guest-container">
        <h1>Welcome to the G Team!</h1>
        <img src={this.state.avatarUrl} alt="" />
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          // onRequest={this.getUser}
        />
      </div>
    );
  }
}
