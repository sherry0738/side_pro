import React, {Component} from 'react';
import {
  getTokenObj,
  getDecodedToken,
  checkUserExist,
} from './../utils/AuthUtils';
import orangeRound from './../orangeRound.png';
import orangeLoop from './../orangeLoop.png';
import LoginNotification from './../components/LoginNotification';
import {Card, Icon, Avatar, Collapse, Radio, Spin, Form, Button} from 'antd';
import './User.css';

class User extends Component {
  constructor (props) {
    super (props);
    this.state = {
      symbolValue: '',
      bGroundValue: '',
      borderValue: '',
      avatarView: '',
      name: '',
      description: '',
      scores: 0,
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
    this.setState ({
      avatarView: this.props.avatarUrl
        ? this.props.avatarUrl
        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA_oX0Xg-tJvcxkxwvc3C4AYnlJDJfvpWTQ5jFnUR7yAjDqtQS',
    });
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
        console.log ('Received values of form: ', values);
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
        });
      }
    });
  };

  checkDefaultAvatar = () => {
    if (!this.props.avatarUrl) {
      console.log ('');
      return (
        <div className="spinCover">
          <Spin size="small" />;
        </div>
      );
    }
    return <img alt="avatar-view" src={this.state.avatarView} />;
  };

  handleAvatarDisplay = (symbolValue, bGroundValue, borderValue) => {
    if (!symbolValue || !bGroundValue || !borderValue) {
      return this.checkDefaultAvatar ();
    }
    //console.log ('value for avatar view', value);
    // const validatedUrl = ValidUrl (value);
    console.log ('this.state.symbolValue', symbolValue);
    console.log ('this.state.bGroundValue', bGroundValue);
    console.log ('this.state.borderValue', borderValue);

    return (
      <div className="avatarContainer">
        <img className="symbol image" src={symbolValue} />
        <img className="bGround image" src={bGroundValue} />
        <img className="border image" src={borderValue} />
      </div>
    );
  };

  symbolChange = e => {
    // console.log ('symbol checked', e.target.value);
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
    // console.log ('bGround checked', e.target.value);
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
    // console.log ('border checked', e.target.value);
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
      console.log ('here');
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

    return (
      <div className="avatarContainer">
        <img className="symbol image" src={this.state.symbolValue} />
        <img className="bGround image" src={this.state.bGroundValue} />
        <img className="border image" src={this.state.borderValue} />
      </div>
    );
  };

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
        label: 'America',
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
        label: 'green',
        value: 'https://requestreduce.org/images/christmas-concert-clipart-16.png',
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
      {
        label: 'Fire',
        value: 'https://c7.uihere.com/files/323/30/535/light-fire-flame-burst-of-fire-round-border.jpg',
      },
    ];

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
              avatar={<Avatar src={this.props.avatarUrl} />}
              title={this.state.name}
              description="scores here"
              scores={this.state.scores}
            />
          </Card>
        </div>
        <div className="collapse-box">
          <h2>Avatar setting</h2>
          <Form onSubmit={this.handleAvatarSubmit}>
            <Collapse bordered={false}>
              <Panel header="Symbol setting" key="1" style={customPanelStyle}>
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

              <Panel header="Border setting" key="3" style={customPanelStyle}>
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
              <Form.Item>
                <Button className="avatarBtn" type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Collapse>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create () (User);
