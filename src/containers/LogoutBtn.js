import React, {Component} from 'react';
import {Button} from 'antd';
import {Redirect} from 'react-router-dom';
import './Home.css';

class LogoutBtn extends Component {
  constructor (props) {
    super (props);
    this.logout = this.logout.bind (this);
    this.state = {
      redirect: false,
    };
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      this.props.parentP.resetAuth ();
      return <Redirect to="/guest" />;
    }
  };
  logout = () => {
    localStorage.removeItem ('auth');
    this.setState ({
      redirect: true,
    });
  };

  render () {
    return (
      <div>
        <img src={this.props.avatarUrl} alt="" />
        <Button onClick={this.logout} type="primary" size="small">
          Logout
        </Button>
        {this.renderRedirect ()}

      </div>
    );
  }
}
export default LogoutBtn;
