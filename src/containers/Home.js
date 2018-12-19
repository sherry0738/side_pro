import React, {Component} from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import './Home.css';

export default class Home extends Component {
  render () {
    // console.log ('this.props.isLoggedIn in home.js', this.props.isLoggedIn);
    // console.log ('this.props.avatarUrl  in home.js', this.props.avatarUrl);
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
