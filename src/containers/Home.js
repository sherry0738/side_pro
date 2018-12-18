import React, {Component} from 'react';
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
            <button><a>Start</a></button>
          </div>
        </div>
      </div>
    );
  }
}
