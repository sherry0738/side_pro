import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import {getTokenObj} from './../utils/AuthUtils';
import {parseJwt} from './../utils/AuthUtils';
import {getDecodedToken} from './../utils/AuthUtils';
import {getQuiz} from './../utils/Api';
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
      console.log ('tokenObj  in guestpage', tokenObj.id_token);
      this.props.hasAuth ();
      // console.log ('quiz in guestpage', quiz);
      let url = 'http://localhost:3001';
      const id_token = tokenObj.id_token;
      fetch (url, {
        method: 'get',
        headers: new Headers ({Authorization: 'bearer ' + id_token}),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
        .then (res => res.json ())
        .then (res => {
          this.setState ({quiz: res.quizzes});
          console.log ('res in guestpage', res);
          console.log ('this.state.quiz', this.state.quiz);
        });
    } else {
      console.log ('need to login first!!');
    }
  }

  render () {
    const onSuccess = response => {
      this.props.hasAuth ();
      // setTimeout (() => this.props.hasAuth (), 1000);
      localStorage.setItem ('auth', JSON.stringify (response.tokenObj));
      this.props.history.push ('/home');
      //   console.log ('isLoggedIn in onSuccess function', this.props.isLoggedIn);
      //   console.log ('avatar in onSuccess function', this.props.avatarUrl);
    };

    const onFailure = () => {
      this.setState ({isLoggedIn: this.props.isLoggedIn});
      if (localStorage.getItem ('auth')) {
        localStorage.removeItem ('auth');
      }
    };

    return (
      <div>
        <h1>This is Guest page...:)</h1>
        <img src={this.state.avatarUrl} alt="" />
        <GoogleLogin
          clientId="201605823214-a65bf5spbckkrhdvgsvu8get3p5jrhb5.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </div>
    );
  }
}
