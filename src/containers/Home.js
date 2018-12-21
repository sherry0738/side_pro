import React, {Component} from 'react';
import {checkUserExist} from './../utils/AuthUtils';
import {Button, Card} from 'antd';
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
    const gridStyle = {
      width: '33.3%',
      textAlign: 'center',
    };

    return (
      <div className="Home">
        <div className="lander">
          <h1>Are you ready for Onboarding challenge?</h1>
          <div>
            <Button href="/quiz/1" type="primary" size="large">
              Start
            </Button>
          </div>
        </div>
        <div className="topic-container">
          <Card title="Chose A Topic">
            <a href="/quiz/1">
              <Card.Grid style={gridStyle}>Onboarding</Card.Grid>
            </a>
            <Card.Grid style={gridStyle}>Frontend</Card.Grid>
            <Card.Grid style={gridStyle}>Backend</Card.Grid>
            <Card.Grid style={gridStyle}>Database</Card.Grid>
            <Card.Grid style={gridStyle}>Testing</Card.Grid>
            <Card.Grid style={gridStyle}>Other</Card.Grid>
          </Card>
        </div>
      </div>
    );
  }
}
