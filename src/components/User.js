import React, {Component} from 'react';
import {
  getTokenObj,
  getDecodedToken,
  checkUserExist,
} from './../utils/AuthUtils';
import orangeRound from './../orangeRound.png';
import orangeLoop from './../orangeLoop.png';
import LoginNotification from './../components/LoginNotification';
import {
  Card,
  Icon,
  Avatar,
  Collapse,
  Radio,
  Switch,
  message,
  Spin,
  Form,
  Input,
  Button,
  Tabs,
} from 'antd';
import './User.css';
import moment from 'moment';
// import moment = require('moment');

const FormItem = Form.Item;

class User extends Component {
  constructor (props) {
    super (props);
    this.state = {
      symbolValue: '',
      bGroundValue: '',
      borderValue: '',
      avatarView: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA_oX0Xg-tJvcxkxwvc3C4AYnlJDJfvpWTQ5jFnUR7yAjDqtQS',
      name: '',
      description: '',
      scores: 0,
      isNewAvatar: '',
    };
  }

  componentDidMount () {
    const userExist = Boolean (checkUserExist ()) === true;
    if (!userExist) {
      LoginNotification ('warning');
      this.props.history.push ('/guest');
      return console.log ('NEED login FIRST');
    }
    this.props.hasAuth ();
    console.log ('this.props.avatarUrl', this.props.avatarUrl);
    // this.setState ({
    //   avatarView: this.props.avatarUrl
    //     ? this.props.avatarUrl
    //     : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA_oX0Xg-tJvcxkxwvc3C4AYnlJDJfvpWTQ5jFnUR7yAjDqtQS',
    // });
    const userInfo = getDecodedToken ();
    this.setState ({name: userInfo.name});
    console.log (userInfo);
    const tokenObj = getTokenObj ();

    fetch (process.env.REACT_APP_SIDE_PROJECT_API_URI, {
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

  handleAvatarSubmit = e => {
    e.preventDefault ();
    this.props.form.validateFields ((err, values) => {
      if (err) {
        console.log ('err on handkleAvatarSubmit', err);
      }
      if (!err) {
        if (!values) {
          return message.warning (
            'Please select new Avatar setting before submitting your request.'
          );
        }
        const body = values;
        const tokenObj = getTokenObj ();
        fetch (`${process.env.REACT_APP_SIDE_PROJECT_API_URI}/user`, {
          method: 'POST',
          headers: new Headers ({
            Authorization: 'bearer ' + tokenObj.id_token,
            'Content-Type': 'application/json',
          }),

          Accept: 'application/json',
          body: JSON.stringify (body),
        })
          .then (res => res.json ())
          .then (res => {
            if (!res) {
              return message.error ('Update avatar failed! Please try again.');
            }
            console.log ('res in user', res);
            this.setState ({isNewAvatar: res});
            console.log ('state.nisNewAvatar', this.state.isNewAvatar);
            // this.changeAvatar (res);
            return message.success ('Your avatar updated successfully!');
          })
          .then (error => {
            console.log ('error', error);
          });
      }
    });
  };

  // checkDefaultAvatar = () => {
  //   if (!this.props.avatarUrl) {
  //     return (
  //       <div className="spinCover">
  //         <Spin size="small" />;
  //       </div>
  //     );
  //   }
  //   return <img alt="avatar-view" src={this.state.avatarView} />;
  // };

  setAvatar = (symbol, backGround, border) => {
    // if (!symbol || !backGround || !border) {
    //   return <img alt="avatar-view" src={this.state.avatarView} />;
    // }
    return (
      <div className="avatarContainer">
        <img className="symbol image" src={symbol} />
        <img className="bGround image" src={backGround} />
        <img className="border image" src={border} />
      </div>
    );
  };

  handleAvatarDisplay = (symbolValue, bGroundValue, borderValue) => {
    if (!this.state.avatarView) {
      return (
        <div className="spinCover">
          <Spin size="small" />
        </div>
      );
    }
    if (!symbolValue || !bGroundValue || !borderValue) {
      return <img alt="avatar-view" src={this.state.avatarView} />;
    }
    //console.log ('value for avatar view', value);
    return (
      <div className="avatarContainer">
        <img className="symbol image" src={this.state.symbolValue} />
        <img className="bGround image" src={this.state.bGroundValue} />
        <img className="border image" src={this.state.borderValue} />
      </div>
    );
  };

  symbolChange = e => {
    this.setState ({
      symbolValue: e.target.value,
    });
    this.handleAvatarDisplay (
      e.target.value,
      this.state.bGroundValue,
      this.state.borderValue
    );
  };

  bGroundChange = e => {
    this.setState ({
      bGroundValue: e.target.value,
    });
    this.handleAvatarDisplay (
      this.state.symbolValue,
      e.target.value,
      this.state.borderValue
    );
  };

  borderChange = e => {
    this.setState ({
      borderValue: e.target.value,
    });
    this.handleAvatarDisplay (
      this.state.symbolValue,
      this.state.bGroundValue,
      e.target.value
    );
  };

  getCustomizedAvatar = () => {
    if (
      !this.state.symbolValue &&
      !this.state.bGroundValue &&
      !this.state.borderValue
    ) {
      return (
        <div>
          <img
            alt="avatar-view"
            style={{width: 294}}
            src={this.state.avatarView}
          />
        </div>
      );
    }
    return this.setAvatar (
      this.state.symbolValue,
      this.state.bGroundValue,
      this.state.borderValue
    );
  };

  // handleAvatarSwitch () {
  //   return Boolean (this.props.isSetAvatar)
  //     ? this.props.getNewAvatar ()
  //     : this.props.avatarUrl;
  // }

  callback (key) {
    console.log (key);
  }

  switchOnChange (checked) {
    console.log (checked);
  }
  render () {
    const {getFieldDecorator} = this.props.form;
    const {Meta} = Card;
    const Panel = Collapse.Panel;
    const RadioGroup = Radio.Group;
    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: 'hidden',
    };

    const symbolOptions = [
      {
        label: 'Weapon',
        value: 'http://techspective.net/wp-content/uploads/2016/04/symbol.jpg',
      },
      {
        label: 'Fire',
        value: 'https://upload.wikimedia.org/wikipedia/commons/5/57/%E7%81%AB-red.png',
      },
    ];

    const bGroundOptions = [
      {
        label: 'France',
        value: 'https://ih0.redbubble.net/image.66502006.2903/mp,550x550,matte,ffffff,t.3u3.jpg',
      },
      {
        label: 'Shield',
        value: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3MBz4Qmpuux-LvYcEC89cG_gJSlmlQUkWGhzUVcr4kn9-bfIY',
      },
      {
        label: 'G&R',
        value: 'http://sf.co.ua/14/04/wallpaper-743589.jpg',
      },
      {
        label: 'Hungary',
        value: 'http://footage.framepool.com/shotimg/qf/139147502-hungarian-flag-fabric-waving-sway-symbol.jpg',
      },
    ];

    const borderOptions = [
      {
        label: 'Yellow chain',
        value: 'http://shopforclipart.com/images/wedding-ring-images-clipart/10.jpg',
      },
      {
        label: 'Blue chain',
        value: 'https://marketplace.canva.com/MACz7hEgGMk/1/screen/canva-border%2C-ring%2C-frame%2C-design%2C-circle%2C-decoration%2C-round-MACz7hEgGMk.png',
      },
      {
        label: 'Orange round',
        value: orangeRound,
      },
      {
        label: 'Orange Loop',
        value: orangeLoop,
      },
    ];

    const TabPane = Tabs.TabPane;

    return (
      <div className="user-container">
        <div className="avatar-box">
          <Card
            style={{width: 294}}
            cover={this.getCustomizedAvatar ()}
            actions={[
              <Icon type="setting" />,
              <Icon type="edit" />,
              <Icon type="ellipsis" />,
            ]}
          >
            <Meta
              // avatar={<img src={this.handleAvatarSwitch} className="metaAvatar" />}
              title={this.state.name}
              description="scores: 15"
              scores={this.state.scores}
            />
          </Card>
        </div>
        <div className="collapse-box">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Avatar setting" key="1">
              <Form onSubmit={this.handleAvatarSubmit}>
                <Collapse bordered={false}>

                  <Panel
                    header="Symbol setting"
                    key="1"
                    style={customPanelStyle}
                  >
                    <Form.Item>
                      {getFieldDecorator ('avatar_symbol') (
                        <RadioGroup
                          options={symbolOptions}
                          onChange={this.symbolChange}
                          value={this.state.symbolValue}
                        />
                      )}
                    </Form.Item>
                  </Panel>

                  <Panel
                    header="Background setting"
                    key="2"
                    style={customPanelStyle}
                  >
                    <Form.Item>
                      {getFieldDecorator ('avatar_background_colour') (
                        <RadioGroup
                          options={bGroundOptions}
                          onChange={this.bGroundChange}
                          value={this.state.bGroundValue}
                        />
                      )}
                    </Form.Item>
                  </Panel>

                  <Panel
                    header="Border setting"
                    key="3"
                    style={customPanelStyle}
                  >
                    <Form.Item>
                      {getFieldDecorator ('avatar_border') (
                        <RadioGroup
                          options={borderOptions}
                          onChange={this.borderChange}
                          value={this.state.borderValue}
                        />
                      )}
                    </Form.Item>
                  </Panel>
                </Collapse>
                <Form.Item>
                  <Button
                    className="avatarBtn"
                    type="primary"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>

              </Form>
            </TabPane>

            <TabPane tab="Privacy" key="2">
              <Form
                hideRequiredMark={false}
                layout="horizontal"
                className="ant-advanced-search-form"
                // onSubmit={this.handleSubmit}
              >
                <Collapse bordered={false}>
                  <Panel
                    header="Change password"
                    key="1"
                    style={customPanelStyle}
                  >
                    <FormItem label="Old password" required={true}>
                      <Input />
                    </FormItem>
                    <FormItem label="New password" required={true}>
                      <Input />
                    </FormItem>
                    <FormItem label="Confirm password" required={true}>
                      <Input />
                    </FormItem>
                  </Panel>
                  <Panel
                    header="Manage public profile"
                    key="1"
                    style={customPanelStyle}
                  >
                    <FormItem label="Display default avatar">
                      <Switch defaultChecked onChange={this.switchOnChange} />
                    </FormItem>
                    <FormItem label="Everyone can see my profile">
                      <Switch defaultChecked onChange={this.switchOnChange} />
                    </FormItem>
                    <FormItem label="Only team member can see my profile">
                      <Switch defaultChecked onChange={this.switchOnChange} />
                    </FormItem>
                  </Panel>
                </Collapse>
                <Button className="avatarBtn" type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form>
            </TabPane>

            <TabPane tab="Account Management" key="3">
              <Collapse bordered={false}>
                <Panel
                  header="Update your detail"
                  key="1"
                  style={customPanelStyle}
                >
                  <Form
                    hideRequiredMark={false}
                    layout="horizontal"
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSubmit}
                  >
                    <FormItem label="First name">
                      <Input />
                    </FormItem>
                    <FormItem label="Last name">
                      <Input />
                    </FormItem>
                    <FormItem label="Other name you want to display">
                      <Input />
                    </FormItem>
                    <FormItem label="Mobile">
                      <Input />
                    </FormItem>

                  </Form>
                </Panel>
                <Panel header="Site setting" key="2" style={customPanelStyle}>
                  <p>Coming soon...</p>
                </Panel>
              </Collapse>
              <Button className="avatarBtn" type="primary" htmlType="submit">
                Submit
              </Button>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Form.create () (User);
