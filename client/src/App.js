import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Register";
import UnAuth from "./components/UnAuth";
import "./App.scss";
import Register from "./components/Register/";
import actions from "./Store/Auth/action";
import { connect } from "react-redux";
const mapDispatchToProps = dispatch => ({
  isAuthenticated: () => dispatch(actions.isAuth())
});

const mapStateToProps = state => ({
  type: state.Auth.type,
  isAuth: state.Auth.isAuth,
  token: state.Auth.token
});
class App extends Component {
  state = {
    type: "",
    isAuth: ""
  };
  componentDidMount() {
    this.props.isAuthenticated();
  }
  checkAuth() {
    if (localStorage.getItem("auth-token")) {
      return true;
    } else {
      return false;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuth !== this.state.isAuth) {
      this.setState({
        isAuth: nextProps.isAuth
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isAuth !== this.state.isAuth) {
      return true;
    }
  }
  render() {
    console.log("tpe", this.props.isAuth);

    return (
      <Router>
        <div>
          <div className='App'>
            <Route exact path='/register' component={Register} />
            {/* <Route exact path='/login' component={Login} /> */}
            <Route
              exact
              path='/login'
              render={props =>
                this.props.isAuth ? <Redirect to='/' /> : <Login />
              }
            />
            <Route
              exact
              path='/'
              render={props =>
                this.props.isAuth ? (
                  <Dashboard auth={true} token={this.props.token} />
                ) : (
                  <Dashboard auth={false} />
                )
              }
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
