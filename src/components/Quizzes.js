import React, {Component} from 'react';
import {getTokenObj, checkUserExist} from './../utils/AuthUtils';
import {Card, Checkbox, Button, Spin, Pagination, Radio} from 'antd';
import './Quizzes.css';
const RadioGroup = Radio.Group;

export default class Quizzes extends Component {
  constructor (props) {
    super (props);
    this.onPageChange = this.onPageChange.bind (this);
    this.onChange = this.onChange.bind (this);
    this.state = {
      isLoggedIn: false,
      avatarUrl: '',
      quizzes: '',
      currentPage: 1,
      radioValue: '',
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
    fetch (process.env.REACT_APP_SIDE_PROJECT_API_URI, {
      method: 'get',
      headers: new Headers ({Authorization: 'bearer ' + tokenObj.id_token}),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
      .then (res => res.json ())
      .then (res => {
        this.setState ({quizzes: res});
      });
  }

  onChange (e) {
    // console.log (`${e.target.value} checked = ${e.target.checked}`);
    this.setState ({radioValue: e.target.value});
  }

  onPageChange (page) {
    this.setState ({
      currentPage: page,
    });
    this.props.history.replace ({pathname: '/quiz/' + `${page}`});
  }

  handleSubmit = e => {
    e.preventDefault ();
    const tokenObj = getTokenObj ();
    const body = {answerId: this.state.radioValue};
    fetch (`${process.env.REACT_APP_SIDE_PROJECT_API_URI}/quiz`, {
      method: 'POST',
      headers: new Headers ({
        Authorization: 'bearer ' + tokenObj.id_token,
        'Content-Type': 'application/json',
      }),

      Accept: 'application/json',
      body: JSON.stringify (body),
    });
  };

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
          <Radio value={answer.id}>
            <span>{answer.title.toUpperCase ()}.</span>
          </Radio>
          {answer.content}
        </p>
      );
    });
    const answersGroup = (
      <RadioGroup
        name="answerOptions"
        onChange={this.onChange}
        value={this.state.radioValue}
      >
        {answers}
      </RadioGroup>
    );

    return (
      <div key={quiz.id}>
        <Card title={`${quizType}` + ' quiz'}>
          <Card
            className="quizCard"
            type="inner"
            title={`${quiz.id}. ${quiz.question_body}`}
            bordered={false}
          >
            {answersGroup}
          </Card>
          <Button
            href={`/quiz/${quiz.id} `}
            type="primary"
            htmlType="submit"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>

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
