import {notification} from 'antd';
import 'antd/dist/antd.css';

const loginNotification = type => {
  notification[type] ({
    message: 'Please Log in first!',
  });
};

export default loginNotification;
