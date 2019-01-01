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
      quiz: '',
    };
  }

  componentDidMount () {
    const tokenObj = getTokenObj ();

    if (tokenObj && tokenObj.id_token) {
      // const quiz = getQuiz (tokenObj.id_token);
      this.props.hasAuth ();
      const id_token = tokenObj.id_token;

      fetch (process.env.REACT_APP_SIDE_PROJECT_API_URI, {
        method: 'get',
        headers: new Headers ({Authorization: 'bearer ' + id_token}),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
        .then (res => res.json ())
        .then (res => {
          this.setState ({quiz: res.quizzes});
        });
    } else {
      console.log ('need to login first!!');
    }
  }

  render () {
    if (Boolean (this.props.isLoggedIn)) {
      this.props.history.push ('/home');
    }
    const onSuccess = response => {
      // this.props.hasAuth ();
      setTimeout (() => this.props.hasAuth (), 1000);
      localStorage.setItem ('auth', JSON.stringify (response.tokenObj));
      this.props.history.push ('/home');
    };

    const onFailure = () => {
      this.setState ({isLoggedIn: this.props.isLoggedIn});
      if (localStorage.getItem ('auth')) {
        localStorage.removeItem ('auth');
      }
    };

    return (
      <div>
        <h1>Welcome to the G Team!</h1>
        <img src={this.state.avatarUrl} alt="" />
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </div>
    );
  }
}
