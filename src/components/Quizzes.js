import React, {Component} from 'react';
import {getTokenObj, checkUserExist} from './../utils/AuthUtils';
import {Card, Checkbox, Button, Spin, Pagination} from 'antd';
import './Quizzes.css';

export default class Quizzes extends Component {
  constructor (props) {
    super (props);
    this.onPageChange = this.onPageChange.bind (this);
    this.state = {
      isLoggedIn: false,
      avatarUrl: '',
      quizzes: '',
      currentPage: 1,
    };
  }
  currentId = () => {
    return this.props.history.location.pathname.replace ('/quiz/', '');
  };

  componentDidMount () {
    const {quizId} = this.currentId ();
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
        this.setState ({quizzes: res.quizzes});
      });
  }

  onChange (e) {
    console.log (`checked = ${e.target.checked}`);
  }

  onPageChange (page) {
    this.setState ({
      currentPage: page,
    });
    this.props.history.replace ({pathname: '/quiz/' + `${page}`});
  }

  render () {
    let quiz = null;
    if (this.state.quizzes) {
      quiz = this.state.quizzes.find (quiz => quiz.id === this.currentId ());
      const answers = quiz.answers.map ((answer, index) => {
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
        <div key={quiz.id}>
          <Card title="Quiz">
            <Card
              className="quizCard"
              type="inner"
              title={`${quiz.id}. ${quiz.question_body}`}
              bordered={false}
            >
              {answers}
              <Button
                href={`/quiz/${quiz.id} `}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Card>
          </Card>
          <Pagination
            defaultCurrent={1}
            pageSize={1}
            total={2}
            onChange={this.onPageChange}
            current={this.state.currentPage}
          />
        </div>
      );
    } else {
      return (
        <div className="example">
          <Spin size="large" />
        </div>
      );
    }
  }
}
