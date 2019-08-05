import React, { Component } from "react";
import { Link } from "react-router-dom";

import classnames from "classnames";
import actions from "../Store/Auth/action";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(actions.login(user))
});

const mapStateToProps = state => ({
  isAuth: state.Auth.isAuth
});
class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  onChangeEmail = event => {
    this.setState({
      email: event.target.value
    });
  };
  onChangePassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(user);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuth) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <section className='hero is-warning is-fullheight'>
          <div className='hero-body'>
            <div className='container has-text-centered'>
              <div className='column is-4 is-offset-4'>
                <h3 className='title has-text-grey'>Login</h3>
                <p className='subtitle has-text-grey'>
                  Please login to proceed.
                </p>
                <div className='box'>
                  <form onSubmit={this.onSubmit}>
                    <div className='field'>
                      <label className='label has-text-grey'>
                        {" "}
                        Enter Email
                      </label>
                      <div className='control'>
                        <input
                          onChange={this.onChangeEmail}
                          value={this.state.email}
                          className={classnames("input is-large", {
                            "is-danger": errors.email
                          })}
                          type='email'
                          placeholder='Your Email'
                          autoFocus=''
                        />
                        {errors.email && (
                          <div className='help is-danger'>{errors.email}</div>
                        )}
                      </div>
                    </div>

                    <div className='field'>
                      <label className='label has-text-grey'>
                        {" "}
                        Enter Password
                      </label>

                      <div className='control'>
                        <input
                          onChange={this.onChangePassword}
                          value={this.state.password}
                          className={classnames("input is-large", {
                            "is-danger": errors.password
                          })}
                          type='password'
                          placeholder='Your Password'
                        />
                        {errors.passwords && (
                          <p className='help is-danger'>{errors.passwords}</p>
                        )}
                      </div>
                    </div>
                    <div className='field'>
                      <label className='checkbox'>
                        <input type='checkbox' />
                        Remember me
                      </label>
                    </div>
                    <button className='button is-block is-info is-large is-fullwidth'>
                      Login
                    </button>
                  </form>
                </div>
                <p className='has-text-grey'>
                  <Link to='/signup'>Sign Up</Link> &nbsp;·&nbsp;
                  <a href='../'>Forgot Password</a> &nbsp;·&nbsp;
                  <a href='../'>Need Help?</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
