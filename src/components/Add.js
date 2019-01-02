import React from 'react';
import {checkUserExist} from './../utils/AuthUtils';
import LoginNotification from './../components/LoginNotification';
import {Card, Form, Input, Button, Icon, Select} from 'antd';
import './Add.css';

const FormItem = Form.Item;
const Option = Select.Option;

class AddNew extends React.Component {
  constructor (props) {
    super (props);

    const value = props.value || {};
    this.state = {
      quizType: value.type || 'Please select a quiz type',
    };
  }
  componentDidMount () {
    const userExist = Boolean (checkUserExist ()) === true;
    if (!userExist) {
      LoginNotification ('warning');
      this.props.history.push ('/');
      return console.log ('NEED login FIRST');
    }
    this.props.hasAuth ();
  }

  getFields () {
    const {getFieldDecorator} = this.props.form;
    const children = [];
    const defaultAlph = 'abc'.split ('');
    defaultAlph.forEach ((l, index) => {
      for (let i = l; i < l + 3; i++) {
        children.push (
          <FormItem label={`${i}`} key={index}>
            {getFieldDecorator (`${i}`, {
              rules: [
                {
                  required: true,
                  message: 'Is required!',
                },
              ],
            }) (<Input placeholder={`answer ${i}`} />)}
          </FormItem>
        );
      }
    });

    return children;
  }

  requiredWarining () {
    this.form.getFieldDecorator ({
      rules: [
        {
          required: true,
          message: 'Is required!',
        },
      ],
    });
  }

  handleSubmit = e => {
    e.preventDefault ();
    this.props.form.validateFields ((err, values) => {
      if (!err) {
        console.log ('Received values of form: ', values);
        fetch (process.env.REACT_APP_SIDE_PROJECT_API_URI, {
          method: 'POST',
          body: values,
        });
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields ();
  };

  handleQuizTypeChange = value => {
    this.setState ({quizType: value});
    this.triggerChange ({value});
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange (Object.assign ({}, this.state, changedValue));
    }
  };

  render () {
    return (
      <div className="quiz-form">
        <Card title="Create quiz form" bordered={false}>
          <Form
            hideRequiredMark={false}
            layout="horizontal"
            className="ant-advanced-search-form"
            onSubmit={this.handleSubmit}
          >
            {/* Add a dropdown input here */}
            <FormItem label="Quiz Type">
              <Select
                value={this.state.quizType}
                required={true}
                style={{width: '35%'}}
                onChange={this.handleQuizTypeChange}
              >
                <Option value="onboarding">Onboarding</Option>
                <Option value="frontend">Frontend</Option>
                <Option value="backend">Backend</Option>
                <Option value="database">Database</Option>
                <Option value="testing">Testing</Option>
                <Option value="other">Other</Option>
              </Select>
            </FormItem>
            <FormItem label="Question body" required={true}>
              <Input placeholder="or question title here" />
            </FormItem>
            <FormItem label="Answer options">
              {this.getFields ()}
              <FormItem>
                <Button
                  type="dashed"
                  onClick={this.AddFiled}
                  style={{width: '60%'}}
                >
                  <Icon type="plus" /> Add more
                </Button>
              </FormItem>
            </FormItem>
            <FormItem label="Scores" required={true}>
              <Input placeholder="number for this quiz's scores" />
            </FormItem>
            <FormItem label="Correct answer" required={true}>
              <Input placeholder="input one of alphabet letter to set the correct answer" />
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit">Submit</Button>
              <Button style={{marginLeft: 10}} onClick={this.handleReset}>
                Clear
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

const Add = Form.create () (AddNew);
export default Add;
