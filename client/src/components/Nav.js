import React, { Component } from "react";
import { Layout, Button } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import actions from "../Store/Auth/action";

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});
const mapStateToProps = state => ({
  isAuth: state.Auth.isAuth,
});

const { Header } = Layout;
class Nav extends Component {
  logout = () => {
    this.props.logout();
  };
  login = () => {
    this.props.history.push("/login");
  };
  signup = () => {
    this.props.history.push("/register");
  };


  render() {

    return (
      <Header>
        <div className='brand'>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => this.props.history.push("/")}>
            Find My Boo!
          </span>
          <span />

          <span>
            {this.props.isAuth ? (
              <Button type='danger' onClick={this.logout}>
                Logout
              </Button>
            ) : (
              <span>
                <button
                  className='button is-warning'
                  style={{ marginTop: "1rem" }}
                  onClick={this.login}>
                  Login
                </button>
                <button
                  className='button is-warning'
                  style={{ marginTop: "1rem", marginLeft: "10px" }}
                  onClick={this.signup}>
                  Signup
                </button>
              </span>
            )}
          </span>
        </div>
        
      </Header>
    );
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Nav)
);
