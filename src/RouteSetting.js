import React from 'react';
// import GoogleLogin from 'react-google-login';
// import GoogleLogout from 'react-google-login';
// import {googleLogIn} from './SingleSignOn';
// import {googleLogOut} from './SingleSignOn';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';

////////////////////////////////////////////////////////////
// 1. Click the Welcome page
// 2. Click the Loggedin-welcome page
// 3. Log in
// 4. Click the back button, note the URL each time

const routeSetting = () => {
  return (
    <Router>
      <div>

        <Route path="/welcome" component={Welcome} />
        <PrivateRoute path="/logged-in-app" component={LoggedInApp} />
      </div>
    </Router>
  );
};

const authCheck = {
  isLoggedIn: false,
  onSuccess () {
    this.isLoggedIn = true;
    // localStorage.setItem ('auth', JSON.stringify (response.tokenObj));
    // setTimeout (cb, 100); // fake async
  },
  onFailure () {
    this.isLoggedIn = false;
    // localStorage.removeItem ('auth');
  },
  logOut () {
    this.isLoggedIn = false;
    // setTimeout (cb, 100);
  },
};

// const AuthButton = withRouter (
//   ({history}) =>
//     authCheck.onSuccess
//       ? <p>
//           Welcome!{' '}
//           <button
//             onClick={() => {
//               authCheck.logOut (() => history.push ('/'));
//             }}
//           >
//             Sign out
//           </button>
//         </p>
//       : <p>You are not logged in.</p>
// );

function LoggedInApp({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={props =>
        authCheck.onSuccess
          ? <div>
              <img src={props.url} />
              {googleLogOut}
            </div>
          : //   <Component {...props} />
            <Redirect
              to={{
                pathname: '/welcome',
                state: {from: props.location},
              }}
            />}
    />
  );
}

const Welcome = () => {
  return (
    <div>
      <h3>Welcome to G team!</h3>
      {googleLogIn}
    </div>
  );
};

// function LoggedInApp () {
//   return (
//     <div>
//       <h3>This is the page display only after log in</h3>

//     </div>
//   );
// }

// class Login extends React.Component {
//   state = {redirectToReferrer: false};

//   login = () => {
//     authCheck.onSuccess (() => {
//       this.setState ({redirectToReferrer: true});
//     });
//   };

//   render () {
//     let {from} = this.props.location.state || {from: {pathname: '/'}};
//     let {redirectToReferrer} = this.state;

//     if (redirectToReferrer) return <Redirect to={from} />;

//     return (
//       <div>
//         <p>You must log in to view the page at {from.pathname}</p>
//         <button onClick={this.login}>Log in</button>
//       </div>
//     );
//   }
// }

export default routeSetting;
