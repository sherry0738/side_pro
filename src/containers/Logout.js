import React from 'react';
import GoogleLogout from 'react-google-login';
import './Home.css';

const logout = props => {
  if (props.avatarUrl === '') {
    localStorage.removeItem ('auth');
  }
  //   props.history.push ('/');
  //   console.log ('this.props.isLoggedIn in home.js', props.isLoggedIn);
  //   console.log ('props.avatarUrl  in home.js', props.avatarUrl);
  return (
    <div>
      <img src={props.avatarUrl} alt="" />
      <GoogleLogout
        clientId="201605823214-a65bf5spbckkrhdvgsvu8get3p5jrhb5.apps.googleusercontent.com"
        buttonText="Logout"
        onSuccess={logout}
      />
    </div>
  );
};
export default logout;
