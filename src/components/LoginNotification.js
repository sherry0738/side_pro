// import React, {Component} from 'react';
import {checkUserExist} from './../utils/AuthUtils';
import {notification} from 'antd';
import 'antd/dist/antd.css';
// import './LoginNotification.css';

const loginNotification = type => {
  notification[type] ({
    message: 'Please Log in first!',
    description: '',
  });
};

export default loginNotification;
