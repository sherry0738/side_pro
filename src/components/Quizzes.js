import React, {Component} from 'react';
import {getTokenObj} from './../utils/AuthUtils';
import {Card, Checkbox, Button} from 'antd';
// import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import './Quizzes.css';

export default class Quizzes extends Component {
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
      this.props.hasAuth ();

      let url = 'http://localhost:3001';
      const id_token = tokenObj.id_token;
      //   const quizz = getQuiz (id_token);
      fetch (url, {
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
      this.props.history.push ('/');
      console.log ('NEED login FIRST');
    }
  }

  onChange (e) {
    console.log (`checked = ${e.target.checked}`);
  }
  render () {
    let quiz = null;
    if (this.state.quiz) {
      quiz = this.state.quiz.map ((q, i) => {
        const answers = q.answers.map ((answer, index) => {
          return (
            <p key={index}>
              <Checkbox onChange={this.onChange}>
                <span>{answer.title.toUpperCase ()}.</span>
              </Checkbox>
              {answer.description}
            </p>
          );
        });

        return (
          <div key={i}>
            <Card
              className="quizCard"
              type="inner"
              title={`${q.id}. ${q.question_body}`}
              bordered={false}
              //   style={{width: 800}}
            >
              {answers}
              <Button href={`/quiz/${q.id} `} type="primary" htmlType="submit">
                Submit
              </Button>
            </Card>
          </div>
        );
      });
    } else {
      console.log ('loading... maybe a loader here');
    }

    return (
      <div style={{background: '#ECECEC', padding: '30px'}}>
        {quiz}
      </div>
    );
  }
}
