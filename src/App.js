import React, {Component, Fragment} from 'react';
import Routes from './Routes';
import {getTokenObj, getDecodedToken} from './utils/AuthUtils';
import {Link} from 'react-router-dom';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import LogoutBtn from './containers/LogoutBtn';
import './App.css';

class App extends Component {
  constructor (props) {
    super (props);

    this.state = {
      isLoggedIn: false,
      avatarUrl: '',
      totalQuiz: 1,
    };
  }

  hasAuth = () => {
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
        this.setState ({totalQuiz: res.totalCount});
      });
    console.log (this.state.quiz);
    const decodedToken = getDecodedToken ();
    this.setState ({isLoggedIn: true, avatarUrl: decodedToken.picture});
  };
  // Building a React App-Add the Session to the State

  render () {
    // const totalQuiz = this.state.totalQuiz;
    const childProps = {
      totalQuiz: this.state.totalQuiz,
      isLoggedIn: this.state.isLoggedIn,
      avatarUrl: this.state.avatarUrl,
      hasAuth: this.hasAuth,
    };
    console.log (this.state.quiz);
    return (
      <div className="App container">

        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/home">
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

              <LinkContainer to="/home">
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

              {Boolean (this.state.isLoggedIn)
                ? <div className="menu-box">
                    <Fragment>
                      <LinkContainer to="#">
                        <NavItem>
                          <img
                            src={this.state.avatarUrl}
                            className="avatar-img"
                            alt="avatar-menu"
                          />
                        </NavItem>
                      </LinkContainer>
                      <LinkContainer to="#">
                        <NavItem><LogoutBtn /></NavItem>
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
