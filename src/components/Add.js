import React, {Component} from 'react';
import {Form, Input, Button, Icon} from 'antd';
import './Add.css';

const FormItem = Form.Item;
let id = 0;

class AddNew extends React.Component {
  getFields () {
    const {getFieldDecorator} = this.props.form;
    const children = [];
    const defaultAlph = 'abc'.split ('');
    const restAlph = 'defghijklmnopqrstuvwxyz'.split ('');
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
  remove = k => {
    const {form} = this.props;
    const keys = form.getFieldValue ('keys');
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue ({
      keys: keys.filter (key => key !== k),
    });
  };

  AddFiled () {
    const {form} = this.props;
    const keys = form.getFieldValue ('keys');
    const nextkeys = keys.concat (++id);
    form.setFieldsValue ({
      keys: nextkeys,
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
      <div>
        <h1>Create quiz form</h1>
        <Form
          layout="horizontal"
          className="ant-advanced-search-form"
          onSubmit={this.handleSubmit}
        >
          <FormItem label="Question body">
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
                <Icon type="plus" /> Add field
              </Button>
            </FormItem>
          </FormItem>
          <FormItem label="Scores">
            <Input placeholder="number for this quiz's scores" />
          </FormItem>
          <FormItem label="Correct answer">
            <Input placeholder="input one of alphabet letter to set the correct answer" />
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit">Submit</Button>
            <Button style={{marginLeft: 8}} onClick={this.handleReset}>
              Clear
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Add = Form.create () (AddNew);
export default Add;
