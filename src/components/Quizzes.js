import React, {Component} from 'react';
import {getTokenObj, checkUserExist} from './../utils/AuthUtils';
import {Card, Button, Spin, Pagination, Radio, message, Modal} from 'antd';
import {Redirect} from 'react-router-dom';
import LoginNotification from './../components/LoginNotification';
import './Quizzes.css';
const RadioGroup = Radio.Group;

export default class Quizzes extends Component {
  constructor (props) {
    super (props);
    this.onPageChange = this.onPageChange.bind (this);
    this.handleRadioChange = this.handleRadioChange.bind (this);
    this.state = {
      isLoggedIn: false,
      avatarUrl: '',
      quizzes: '',
      currentPage: 1,
      radioValue: '',
      idMapOrderNum: [],
      redirect: false,
      isSubmitted: false,
      radioDisabled: false,
      btnDisabled: false,
    };
  }

  currentId = () => {
    return this.props.history.location.pathname.replace ('/quiz/', '');
  };

  getQuizId = () => this.currentId ();

  componentDidMount () {
    const userExist = Boolean (checkUserExist ()) === true;
    if (!userExist) {
      LoginNotification ('warning');
      return this.props.history.push ('/guest');
    }

    this.props.hasAuth ();
    const tokenObj = getTokenObj ();
    fetch (`${process.env.REACT_APP_SIDE_PROJECT_API_URI}/quiz`, {
      method: 'get',
      headers: new Headers ({Authorization: 'bearer ' + tokenObj.id_token}),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
      .then (res => res.json ())
      .then (res => {
        const idMaps = res.map (quiz => {
          return {
            questionId: quiz.id,
            orderNum: quiz.order_num,
          };
        });
        this.setState ({
          quizzes: res,
          idMapOrderNum: idMaps,
        });
        return idMaps;
      })
      .then (idMaps => {
        const idMap = idMaps.find (ele => ele.questionId == this.currentId ());
        this.setState ({
          currentPage: idMap.orderNum,
          radioDisabled: false,
          btnDisabled: false,
        });
      });
  }

  handleRadioChange (e) {
    // const isSubmitted = this.state.isSubmitted;
    console.log (`${e.target.value} checked = ${e.target.checked}`);
    this.setState ({
      radioValue: e.target.value,
    });
    // if (Boolean (isSubmitted)) {
    //   this.setState ({radioDisabled: true, btnDisabled: true});
    // }
  }

  onPageChange (page) {
    this.setState ({
      currentPage: page,
    });
    // console.log ('this.state.currentPage', this.state.currentPage);
    this.props.history.replace ({pathname: '/quiz/' + `${page}`});
  }

  displayResult = isCorrect => {
    if (!isCorrect) {
      return message.error (`Uh-oh! It's incorrect.`);
    }
    return message.success (`Awesome! It's correct.`);
  };

  checkSelectedAnswer = (isCorrect, questionId) => {
    if (!Boolean (this.isLastQuiz (questionId))) {
      return this.displayResult (isCorrect);
    }
    this.displayResult (isCorrect);
    this.setState ({
      redirect: true,
    });
    setTimeout (() => {
      Modal.success ({
        title: 'Congratulation!! You finished all the quizzes.',
        content: 'Your scores is some scores here. Would you like to retry?',
      });
    }, 1000);
    return <Redirect to="/" />;
  };

  findCurrentOrderNum = id => {
    if (this.state.idMapOrderNum == []) {
      return false;
    }
    const currentQuiz = this.state.idMapOrderNum.find (
      ele => ele.questionId == id
    );
    return currentQuiz.orderNum;
  };

  isLastQuiz = questionId => {
    if (this.state.idMapOrderNum == []) {
      return false;
    }
    const orderNums = this.state.idMapOrderNum.map (ele => ele.orderNum);
    const biggestOrderNum = Math.max (...orderNums);
    const currentOrderNum = this.findCurrentOrderNum (questionId);
    if (currentOrderNum == biggestOrderNum) {
      return true;
    }
  };

  handleSubmit = e => {
    e.preventDefault ();
    this.setState ({
      currentPage: this.currentId,
    });
    if (!this.state.radioValue) {
      return message.warning ('Please select at least one answer.');
    }
    const body = {
      selectAnswerId: this.state.radioValue,
      questionId: parseInt (this.getQuizId ()),
    };

    const tokenObj = getTokenObj ();
    fetch (`${process.env.REACT_APP_SIDE_PROJECT_API_URI}/quiz`, {
      method: 'POST',
      headers: new Headers ({
        Authorization: 'bearer ' + tokenObj.id_token,
        'Content-Type': 'application/json',
      }),

      Accept: 'application/json',
      body: JSON.stringify (body),
    })
      .then (res => {
        if (res.ok) {
          return res.json ();
        } else {
          res.json ().then (error => {
            message.error (error.error);
          });
          return null;
        }
      })
      .then (res => {
        if (res) {
          this.setState ({isSubmitted: true});
          this.checkSelectedAnswer (res.isCorrect, body.questionId);
        }
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
        onChange={this.handleRadioChange}
        value={this.state.radioValue}
        disabled={this.state.radioDisabled}
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
            disabled={this.state.btnDisabled}
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
