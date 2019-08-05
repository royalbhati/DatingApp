import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import actions from "../../Store/Auth/action";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(actions.register(user))
});

const mapStateToProps = state => ({
  error: state.Auth.isAuth,
  msg: state.Auth.msg
});

class signup extends Component {
  state = {
    name: "",
    age: 0,
    email: "",
    password: "",
    password2: "",
    errors: {}
  };
  onChangeName = event => {
    this.setState({
      name: event.target.value
    });
  };
  onChangeAge = event => {
    this.setState({
      age: event.target.value
    });
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
  onChangePassword2 = event => {
    this.setState({
      password2: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      age: parseInt(this.state.age),
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.register(newUser);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.msg || nextProps.errors) {
      this.setState({
        errors: nextProps.errors ? nextProps.errors : "",
        msg: nextProps.msg ? nextProps.msg : ""
      });
    }
    this.props.history.push("/login");
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <section class='hero is-warning is-fullheight'>
          <div class='hero-body'>
            <div class='container has-text-centered'>
              <div class='column is-4 is-offset-4'>
                <h3 class='title has-text-grey'>Signup</h3>
                <p class='subtitle has-text-grey'>Enter your details</p>
                <div class='box'>
                  <form onSubmit={this.onSubmit}>
                    <div class='field'>
                      <label className='label has-text-grey'> Enter Name</label>
                      <div class='control'>
                        <input
                          onChange={this.onChangeName}
                          value={this.state.name}
                          className={classnames("input is-large", {
                            "is-danger": errors.name
                          })}
                          type='text'
                          placeholder='Your Name'
                          autofocus=''
                          required
                        />
                        {errors.name && (
                          <p classname='help is-danger'>{errors.name}</p>
                        )}
                      </div>
                    </div>
                    <div class='field'>
                      <label className='label has-text-grey'> Enter Age</label>
                      <div class='control'>
                        <input
                          onChange={this.onChangeAge}
                          value={this.state.age}
                          className={classnames("input is-large", {
                            "is-danger": errors.age
                          })}
                          type='number'
                          placeholder='Your age'
                          autofocus=''
                          required
                        />
                        {errors.age && (
                          <p classname='help is-danger'>{errors.age}</p>
                        )}
                      </div>
                    </div>

                    <div class='field'>
                      <label className='label has-text-grey'>
                        {" "}
                        Enter Email
                      </label>
                      <div class='control'>
                        <input
                          onChange={this.onChangeEmail}
                          value={this.state.email}
                          className={classnames("input is-large", {
                            "is-danger": errors.email
                          })}
                          type='email'
                          placeholder='Your Email'
                          autofocus=''
                          required
                        />
                        {errors.email && (
                          <p classname='help is-danger'>{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div class='field'>
                      <label className='label has-text-grey'>
                        {" "}
                        Enter Password
                      </label>

                      <div class='control'>
                        <input
                          onChange={this.onChangePassword}
                          value={this.state.password}
                          className={classnames("input is-large", {
                            "is-danger": errors.password
                          })}
                          type='password'
                          placeholder='Your Password'
                          required
                        />
                        {errors.password && (
                          <p className='help is-danger'>{errors.password}</p>
                        )}
                      </div>
                    </div>
                    <div class='field'>
                      <label className='label has-text-grey'>
                        {" "}
                        Confirm Password
                      </label>

                      <div class='control'>
                        <input
                          onChange={this.onChangePassword2}
                          value={this.state.password2}
                          className={classnames("input is-large", {
                            "is-danger": errors.passwords
                          })}
                          type='password'
                          placeholder='Your Password'
                          required
                        />
                        {errors.passwords && (
                          <p className='help is-danger'>{errors.passwords}</p>
                        )}
                      </div>
                    </div>

                    <button class='button is-block is-info is-large is-fullwidth'>
                      Register
                    </button>
                  </form>
                </div>
                <p class='has-text-grey'>
                  <Link to='/login'>Login</Link> &nbsp;·&nbsp;
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
  )(signup)
);
