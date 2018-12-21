import React, {Component} from 'react';
import {checkUserExist} from './../utils/AuthUtils';
import {Card, Form, Input, Button, Icon} from 'antd';
import './Add.css';

const FormItem = Form.Item;
// let id = 0;

class AddNew extends React.Component {
  componentDidMount () {
    const userExist = Boolean (checkUserExist ()) === true;
    if (!userExist) {
      this.props.history.push ('/');
      return console.log ('NEED login FIRST');
    }
    this.props.hasAuth ();
  }

  getFields () {
    const {getFieldDecorator} = this.props.form;
    const children = [];
    const defaultAlph = 'abc'.split ('');
    defaultAlph.forEach (l => {
      for (let i = l; i < l + 3; i++) {
        children.push (
          <FormItem label={`${i}`}>
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
      console.log ('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields ();
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
            <FormItem label="Question body" required={true}>
              <Input placeholder="or question title here" />
            </FormItem>
            <FormItem label="Answer options">
              {this.getFields ()}
              <FormItem
              // {...formItemLayoutWithOutLabel}
              >
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
