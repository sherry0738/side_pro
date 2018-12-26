import React from 'react';
import {Button} from 'antd';
import './Home.css';

const logoutBtn = props => {
  const logout = () => {
    localStorage.removeItem ('auth');
  };
  return (
    <div>
      <img src={props.avatarUrl} alt="" />
      <Button href="/" onClick={logout} type="primary" size="small">
        Logout
      </Button>
    </div>
  );
};
export default logoutBtn;