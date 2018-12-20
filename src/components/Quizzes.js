import React, {Component} from 'react';
import {getTokenObj, checkUserExist} from './../utils/AuthUtils';
import {Card, Checkbox, Button, Spin} from 'antd';
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
    const userExist = Boolean (checkUserExist ()) === true;
    if (!userExist) {
      this.props.history.push ('/');
      return console.log ('NEED login FIRST');
    }
    this.props.hasAuth ();

    const tokenObj = getTokenObj ();
    let url = 'http://localhost:3001';
    fetch (url, {
      method: 'get',
      headers: new Headers ({Authorization: 'bearer ' + tokenObj.id_token}),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
      .then (res => res.json ())
      .then (res => {
        this.setState ({quiz: res.quizzes});
      });
  }

  onChange (e) {
    console.log (`checked = ${e.target.checked}`);
  }
  render () {
    let quiz = null;
    if (this.state.quiz) {
      quiz = this.state.quiz.map ((q, i) => {
        //   const plainOptions = q.answers.map(answer)
        const answers = q.answers.map ((answer, index) => {
          return (
            <p key={index}>
              <Checkbox onChange={this.onChange} autoFocus={true}>
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
      return (
        <div className="example">
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div style={{background: '#ECECEC', padding: '30px'}}>
        {quiz}
      </div>
    );
  }
}
