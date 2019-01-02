import React, {Component} from 'react';
import {
  getTokenObj,
  getDecodedToken,
  checkUserExist,
} from './../utils/AuthUtils';
import LoginNotification from './../components/LoginNotification';
import {Card, Icon, Avatar, Collapse, Radio, Spin} from 'antd';
import './User.css';

export default class Quizzes extends Component {
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

  handleAvatarDisplay = value => {
    console.log ('value for avatar view', value);
    // const validatedUrl = ValidUrl (value);
    this.setState ({avatarView: value});
  };
  toggleInput = () => {};
  handleInput = e => {
    console.log ('L74', e.target.value);
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
        label: 'America',
        value: 'https://ih0.redbubble.net/image.66502006.2903/mp,550x550,matte,ffffff,t.3u3.jpg',
      },
      {
        label: 'Flag',
        value: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3MBz4Qmpuux-LvYcEC89cG_gJSlmlQUkWGhzUVcr4kn9-bfIY',
      },
      {
        label: 'Flag2',
        value: 'http://sf.co.ua/14/04/wallpaper-743589.jpg',
      },
      {
        label: 'Flag3',
        value: 'http://footage.framepool.com/shotimg/qf/139147502-hungarian-flag-fabric-waving-sway-symbol.jpg',
      },
    ];

    const borderOptions = [
      {
        label: 'Classic',
        value: 'https://img00.deviantart.net/954e/i/2008/134/b/b/border_iii_by_struckdumb.jpg',
      },
      {
        label: 'Modern',
        value: 'https://dumielauxepices.net/sites/default/files/photography-clipart-borders-714149-3465520.jpg',
      },
    ];

    return (
      <div className="user-container">
        <div className="avatar-box">
          <Card
            style={{width: 294}}
            cover={
              this.state.avatarView
                ? <img
                    alt="avatar-view"
                    style={{width: 294}}
                    src={this.state.avatarView}
                  />
                : <Spin size="small" style={avatarViewStyle} />
            }
            actions={[
              <Icon type="setting" />,
              <Icon type="edit" onClick={this.toggleInput} />,
              <Icon type="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src={this.props.avatarUrl} />}
              title={this.state.name}
              description={this.handleInput}
              scores={this.state.scores}
            />
          </Card>
        </div>
        <div className="collapse-box">
          <h2>Avatar setting</h2>
          <Collapse bordered={false}>
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
