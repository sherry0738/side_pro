import React, {Component, Fragment} from 'react';
import Routes from './Routes';
import {getTokenObj, getDecodedToken} from './utils/AuthUtils';
import {Link} from 'react-router-dom';
import {Avatar} from 'antd';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import LoginNotification from './components/LoginNotification';
import LogoutBtn from './containers/LogoutBtn';
import './App.css';

class App extends Component {
  constructor (props) {
    super (props);

    this.state = {
      isLoggedIn: false,
      isSetAvatar: false,
      avatarUrl: '',
      symbolUrl: '',
      bGroundUrl: '',
      borderUrl: '',
    };
  }

  componentDidMount () {
    const tokenObj = getTokenObj ();

    if (!tokenObj) {
      return LoginNotification ('warning');
    }

    fetch (process.env.REACT_APP_SIDE_PROJECT_API_URI, {
      method: 'get',
      headers: new Headers ({Authorization: 'bearer ' + tokenObj.id_token}),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
      .then (res => res.json ())
      .then (res => {
        console.log ('app res', res);
        this.checkAvatarSet (res.avaSymobol, res.avaBGround, res.avaBorder);
      });
  }

  avatarSet = (symbol, backGround, border) => {
    console.log ('symbol3', symbol);
    console.log ('backGround3', backGround);
    console.log ('border3', border);
    if (!symbol && !backGround && !border) {
      return console.log ('You have not set your avatar yet!');
    }
    return (
      <div className="avatarBox">
        <img className="symbol image" src={symbol} />
        <img className="bGround image" src={backGround} />
        <img className="border image" src={border} />
      </div>
    );
  };

  checkAvatarSet (symbol, backGround, border) {
    if (!symbol && !backGround && !border) {
      return console.log ('You have not set your avatar yet!');
    }
    this.setState ({
      isSetAvatar: true,
      symbolUrl: symbol,
      bGroundUrl: backGround,
      borderUrl: border,
    });
    console.log ('symbol-2', this.state.symbolUrl);
    console.log ('backGround-2', this.state.bGroundUrl);
    console.log ('border-2', this.state.borderUrl);
  }

  hasSetAvatar = () => {
    this.setState ({isSetAvatar: true});
  };

  hasAuth = () => {
    const decodedToken = getDecodedToken ();
    this.setState ({isLoggedIn: true, avatarUrl: decodedToken.picture});
  };
  resetAuth = () => {
    this.setState ({isLoggedIn: false});
  };
  // Building a React App-Add the Session to the State

  render () {
    console.log ('symbol-render', this.state.symbolUrl);
    console.log ('backGround-render', this.state.bGroundUrl);
    console.log ('border-render', this.state.borderUrl);
    console.log ('this.props.avatarUrl', this.state.avatarUrl);
    if (
      !this.state.symbolUrl &&
      !this.state.bGroundUrl &&
      !this.state.borderUrl
    ) {
      return null;
    }

    const getNewAvatar = this.avatarSet (
      this.state.symbolUrl,
      this.state.bGroundUrl,
      this.state.borderUrl
    );

    const defaultAvatar = () => (
      <Avatar
        src={this.state.avatarUrl}
        // className="avatar-img"
        alt="avatar-menu"
      />
    );
    const childProps = {
      isLoggedIn: this.state.isLoggedIn,
      avatarUrl: this.state.avatarUrl,
      isSetAvatar: this.state.isSetAvatar,
      hasAuth: this.hasAuth,
      resetAuth: this.resetAuth,
      hasSetAvatar: this.hasSetAvatar,
      getNewAvatar: this.avatarSet,
    };

    return (
      <div className="App container">

        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                G-Team
                {/* <img
                  className="galahs"
                  src="https://rlv.zcache.com.au/cartoon_galah_cockatoo_classic_round_sticker-r0780d99fb835422e9d16ff902e817b0d_v9waf_8byvr_540.jpg"
                /> */}
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>

              <LinkContainer to="/">
                <NavItem>Home</NavItem>
              </LinkContainer>

              <LinkContainer to="/quiz/1">
                <NavItem>Quiz</NavItem>
              </LinkContainer>

              <LinkContainer to="/add">
                <NavItem>Create quiz</NavItem>
              </LinkContainer>

              <LinkContainer to="/user">
                <NavItem>User</NavItem>
              </LinkContainer>
              {/* <AvatarSet childProps={childProps} /> */}
              {Boolean (this.state.isLoggedIn)
                ? <div className="menu-box">
                    <Fragment>
                      <LinkContainer to="#">
                        <NavItem>
                          {Boolean (this.state.isSetAvatar)
                            ? getNewAvatar
                            : defaultAvatar}
                        </NavItem>
                      </LinkContainer>
                      <LinkContainer to="#">
                        <NavItem><LogoutBtn parentP={childProps} /></NavItem>
                      </LinkContainer>
                    </Fragment>
                  </div>
                : <Fragment>
                    <LinkContainer to="#">
                      <NavItem />
                    </LinkContainer>
                  </Fragment>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default App;
