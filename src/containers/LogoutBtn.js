import React from 'react';
import {Button} from 'antd';
import './Home.css';

const logoutBtn = props => {
  const logout = props => {
    localStorage.removeItem ('auth');
    // this.props.history.push ('/home');
    // history.push ('/');
  };
  return (
    <div>
      <img src={props.avatarUrl} alt="" />
      <Button onClick={logout} type="primary" size="small">
        Logout
      </Button>
    </div>
  );
};
export default logoutBtn;
