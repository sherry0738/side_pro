import React, {Component} from 'react';
import {checkUserExist} from './../utils/AuthUtils';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import './Home.css';

export default class Home extends Component {
  componentDidMount () {
    const userExist = Boolean (checkUserExist ()) === true;
    if (!userExist) {
      this.props.history.push ('/');
      return console.log ('NEED login FIRST');
    }
    return this.props.hasAuth ();
  }

  render () {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Are you ready for a challenge?</h1>
          <div>
            <Button href="/quiz/1" type="primary" size="large">
              Start
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
