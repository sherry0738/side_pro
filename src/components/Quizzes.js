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
    console.log (
      ' this.props.history.location.pathname.replace ',
      this.props.history.location.pathname.replace ('/quiz/', '')
    );
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
    fetch (process.env.REACT_APP_SIDE_PROJECT_API_URI, {
      method: 'get',
      headers: new Headers ({Authorization: 'bearer ' + tokenObj.id_token}),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
      .then (res => res.json ())
      .then (res => {
        console.log ('res', res);
        this.setState ({quizzes: res});
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

  capitalizeFirstLetter (string) {
    return string.charAt (0).toUpperCase () + string.slice (1);
  }
  render () {
    if (!this.state.quizzes) {
      return (
        <div className="example">
          <Spin size="large" />
        </div>
      );
    }

    let quiz = null;
    quiz = this.state.quizzes.find (q => q.id == this.currentId ());
    const quizType = this.capitalizeFirstLetter (quiz.type);
    const answers = quiz.answers.map ((answer, index) => {
      return (
        <p key={index}>
          <Checkbox onChange={this.onChange} autoFocus={true}>
            <span>{answer.title.toUpperCase ()}.</span>
          </Checkbox>
          {answer.content}
        </p>
      );
    });

    return (
      <div key={quiz.id}>
        <Card title={`${quizType}` + ' quiz'}>
          <Card
            className="quizCard"
            type="inner"
            title={`${quiz.id}. ${quiz.question_body}`}
            bordered={false}
          >
            {answers}
            <Button href={`/quiz/${quiz.id} `} type="primary" htmlType="submit">
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
  }
}
