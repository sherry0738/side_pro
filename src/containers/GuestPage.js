import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import {getTokenObj} from './../utils/AuthUtils';
import {parseJwt} from './../utils/AuthUtils';
import {getDecodedToken} from './../utils/AuthUtils';
import {getQuiz} from './../utils/Api';
// import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import './GuestPage.css';

export default class Guestpage extends Component {
  constructor (props) {
    super (props);

    this.state = {
      isLoggedIn: false,
      avatarUrl: '',
    };
  }

  componentDidMount () {
    const tokenObj = getTokenObj ();
    if (!tokenObj || !tokenObj.id_token) {
      this.setState ({isLoggedIn: this.props.isLoggedIn});
      // console.log ('no tokenObj, which mean login has not done!!');
    }
    const decodedToken = parseJwt (tokenObj.id_token);
    const quiz = getQuiz (tokenObj.id_token);

    // console.log ('decodedToken  in guestpage', decodedToken);
    // console.log ('quiz in guestpage', quiz);
    this.setState ({
      isLoggedIn: this.props.isLoggedIn,
      avatarUrl: this.props.avatarUrl,
      quizzes: quiz,
    });
    // console.log ('this.props.isLoggedIn in guestpage', this.props.isLoggedIn);
    // console.log ('this.props.avatarUrl in guestpage', this.props.avatarUrl);
  }

  render () {
    const onSuccess = response => {
      //   this.props.hasAuth ();
      localStorage.setItem ('auth', JSON.stringify (response.tokenObj));
      setTimeout (() => this.props.hasAuth (), 1000);
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
