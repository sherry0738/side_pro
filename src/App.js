import React, {Component, Fragment} from 'react';
// import Quizzes from './Quizzes';
// import User from './User';
// import {Dashboard, GuestPage} from './SingleSignOn';
// import GoogleLogout from './SingleSignOn';
import Routes from './Routes';
import Home from './containers/Home';
import GuestPage from './containers/GuestPage';
import {getDecodedToken} from './utils/AuthUtils';
import Logout from './containers/Logout';
import './App.css';
import {Link} from 'react-router-dom';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class App extends Component {
  constructor (props) {
    super (props);

    this.state = {
      isLoggedIn: false,
      avatarUrl: '',
    };
  }

  hasAuth = () => {
    const decodedToken = getDecodedToken ();

    this.setState ({isLoggedIn: true, auatarUrl: decodedToken.picture});
  };
  // Building a React App-Add the Session to the State

  render () {
    const childProps = {
      isLoggedIn: this.state.isLoggedIn,
      avatarUrl: this.state.avatarUrl,
      hasAuth: this.hasAuth,
    };
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          {/* <Navbar.Header>
            <Navbar.Brand>
              <Link to="/home">Welcome</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header> */}
          <Navbar.Collapse>
            <Nav pullRight>

              <LinkContainer to="/home">
                <NavItem>Home</NavItem>
              </LinkContainer>

              <LinkContainer to="/quiz/1">
                <NavItem>Quiz</NavItem>
              </LinkContainer>

              <LinkContainer to="/user">
                <NavItem>User</NavItem>
              </LinkContainer>
              {Boolean (this.state.isLoggedIn)
                ? <Fragment>
                    <LinkContainer to="#">
                      <NavItem><Logout /></NavItem>
                    </LinkContainer>
                  </Fragment>
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
