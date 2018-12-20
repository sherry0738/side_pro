import React, {Component} from 'react';
import {getTokenObj, checkUserExist} from './../utils/AuthUtils';
import {ValidUrl} from './../utils/ValidUrl';
import {
  Card,
  Upload,
  message,
  Icon,
  Avatar,
  Collapse,
  Radio,
  Input,
  Spin,
} from 'antd';
import './User.css';

export default class Quizzes extends Component {
  constructor (props) {
    super (props);
    console.log ('props', this.props);
    this.state = {
      //   isLoggedIn: false,
      //   avatarUrl: '',
      //   quiz: '',
      symbolValue: '',
      bGroundValue: '',
      borderValue: '',
      avatarView: this.props.avatarUrl,
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

  handleAvatarDisplay = value => {
    console.log ('value for avatar view', value);
    // const validatedUrl = ValidUrl (value);
    // console.log ('validatedUrl', validatedUrl);
    this.setState ({avatarView: value});
  };

  symbolChange = e => {
    console.log ('symbol checked', e.target.value);
    this.setState ({
      symbolValue: e.target.value,
    });
    this.handleAvatarDisplay (this.state.symbolValue);
  };

  bGroundChange = e => {
    console.log ('bGround checked', e.target.value);
    this.setState ({
      bGroundValue: e.target.value,
    });
    this.handleAvatarDisplay (this.state.bGroundValue);
  };

  borderChange = e => {
    console.log ('border checked', e.target.value);
    this.setState ({
      borderValue: e.target.value,
    });
    this.handleAvatarDisplay (this.state.borderValue);
  };

  render () {
    const {Meta} = Card;
    const Panel = Collapse.Panel;
    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: 'hidden',
    };

    const avatarViewStyle = {
      textAlign: 'center',
      background: '#eee8e8',
      borderRadius: 4,
      padding: 80,
      margin: 0,
    };

    const RadioGroup = Radio.Group;

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
        label: 'Dark',
        value: 'bGround dark',
      },
      {
        label: 'Bright',
        value: 'bGround bright',
      },
    ];

    const borderOptions = [
      {
        label: 'Modern',
        value: 'modern border',
      },
      {
        label: 'Classic',
        value: 'classic border',
      },
    ];

    return (
      <div className="user-container">
        <div className="avatar-box">
          <Card
            style={{width: 300}}
            cover={
              this.state.avatarView
                ? <img
                    alt="avatar-view"
                    style={{width: 300}}
                    src={this.state.avatarView}
                  />
                : <Spin size="small" style={avatarViewStyle} />
            }
            actions={[
              <Icon type="setting" />,
              <Icon type="edit" />,
              <Icon type="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src={this.props.avatarUrl} />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </div>
        <div className="collapse-box">
          <h2>Avatar setting</h2>
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header="Symbol setting" key="1" style={customPanelStyle}>
              <RadioGroup
                options={symbolOptions}
                onChange={this.symbolChange}
                symbolValue={this.state.symbolValue}
              />
            </Panel>
            <Panel header="Background setting" key="2" style={customPanelStyle}>
              <RadioGroup
                options={bGroundOptions}
                onChange={this.bGroundChange}
                bGroundValue={this.state.bGroundValue}
              />
            </Panel>
            <Panel header="Border setting" key="3" style={customPanelStyle}>
              <RadioGroup
                options={borderOptions}
                onChange={this.borderChange}
                borderValue={this.state.borderValue}
              />
            </Panel>
          </Collapse>
        </div>
      </div>
    );
  }
}
