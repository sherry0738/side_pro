// import React, {Component} from 'react';
// // import './SingleSignOn.css';
// // import RouteSetting from './RouteSetting';
// // import LoggedInApp from '.LoggedInApp';
// import GoogleLogin from 'react-google-login';
// import GoogleLogout from 'react-google-login';
// import {getTokenObj} from './Utils/AuthUtils';
// import {parseJwt} from './Utils/AuthUtils';
// import {getQuiz} from './Utils/Api';
// // import Quizzes from './Quizzes';
// // import User from './User';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   Redirect,
//   withRouter,
// } from 'react-router-dom';

// class SingleSignOn extends Component {
//   constructor (props) {
//     super (props);
//     this.state = {
//       isLoggedIn: false,
//       avatarUrl: '',
//     };
//   }

//   componentDidMount () {
//     const tokenObj = getTokenObj ();
//     console.log ('tokenObj', tokenObj);

//     if (!tokenObj) {
//       console.log ('no tokenObj, which mean login has not done!!');
//     }

//     if (tokenObj && tokenObj.id_token) {
//       const decodedToken = parseJwt (tokenObj.id_token);
//       const quiz = getQuiz (tokenObj.id_token);
//       console.log ('quiz', quiz);
//       this.setState ({
//         isLoggedIn: true,
//         avatarUrl: decodedToken.picture,
//         quizzes: quiz,
//       });
//     } else {
//       this.setState ({isLoggedIn: false});
//     }
//   }

//   render () {
//     // const isLoggedIn = this.state.isLoggedIn;

//     const onSuccess = response => {
//       const decodedToken = parseJwt (response.tokenObj.id_token);
//       localStorage.setItem ('auth', JSON.stringify (response.tokenObj));
//       setTimeout (
//         () =>
//           this.setState ({isLoggedIn: true, avatarUrl: decodedToken.picture}),
//         1000
//       );
//       console.log ('isLoggedIn in onSuccess function', this.state.isLoggedIn);
//     };
//     console.log (' running under onSuccess function');

//     const onFailure = () => {
//       this.setState ({isLoggedIn: false});
//       //   should back to login page
//       //   localStorage.removeItem ('auth');
//     };

//     const logOut = () => {
//       setTimeout (
//         () => this.setState ({isLoggedIn: false, avatarUrl: ''}),
//         1000
//       );
//       localStorage.removeItem ('auth');
//     };

//     const Dashboard = () => {
//       return (
//         <div>
//           {/* <h1>This is dashboard...</h1> */}
//           <div>
//             <img src={this.state.avatarUrl} />
//             <GoogleLogout
//               clientId="201605823214-a65bf5spbckkrhdvgsvu8get3p5jrhb5.apps.googleusercontent.com"
//               buttonText="Logout"
//               onSuccess={logOut}
//             />
//           </div>
//         </div>
//       );
//     };

//     const GuestPage = () => {
//       return (
//         <div>
//           {/* <h1>This is welcome page...</h1> */}
//           <GoogleLogin
//             clientId="201605823214-a65bf5spbckkrhdvgsvu8get3p5jrhb5.apps.googleusercontent.com"
//             buttonText="Login"
//             onSuccess={onSuccess}
//             onFailure={onFailure}
//           />
//         </div>
//       );
//     };
//     console.log ('isLoggedIn before return', this.state.isLoggedIn);
//     // return (

//     //   <Router>
//     //     <div>
//     //       <Route path="/" exact component={GuestPage} />
//     //       <Route path="/dashboard" exact component={Dashboard} />
//     //       <Route
//     //         exact
//     //         path="/"
//     //         render={() =>
//     //           this.state.isLoggedIn
//     //             ? <Redirect to="/dashboard" exact component={Dashboard} />
//     //             : <Redirect to="/" exact component={GuestPage} />}
//     //       />
//     //     </div>

//     //   </Router>
//     // );
//   }
// }

// export {Dashboard, GuestPage};
// export default SingleSignOn;
