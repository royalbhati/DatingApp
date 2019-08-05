import React, { Component } from "react";
import { Card, message } from "antd";
import { withRouter } from "react-router-dom";
import actions from "../Store/UI/action";
import { connect } from "react-redux";

const { Meta } = Card;

const mapDispatchToProps = dispatch => ({
  like: (currentUser, tolike) => dispatch(actions.like(currentUser, tolike)),
  block: (currentUser, toblock) =>
    dispatch(actions.block(currentUser, toblock)),
  superlike: (currentUser, tosuperlike) =>
    dispatch(actions.superlike(currentUser, tosuperlike)),
  match: (currentUser, likedBy, matchArr) =>
    dispatch(actions.match(currentUser, likedBy, matchArr))
});

const mapStateToProps = state => ({
  token: state.Auth.token,
  isAuth: state.Auth.isAuth,
  type: state.Auth.type
});
class UserCard extends Component {
  state = {
    token: "",
    superlike: "",
    data: ""
  };
  static getDerivedStateFromProps(props, state) {
    if (props.data !== state.data)
      return {
        data: props.data
      };
  }
  componentDidMount() {
    console.log("component with id", this.props);
    if (this.state.data) {
      if (this.props.superLikedBy.indexOf(this.props.data._id) !== -1) {
        this.setState({
          superlike: this.props.data._id
        });
      }
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.token !== this.props.token) {
      this.setState({
        token: nextProps.token
      });
    } else if (this.props.superLikedBy) {
      if (this.props.superLikedBy.indexOf(this.props.data._id) !== -1) {
        this.setState({
          superlike: this.props.data._id
        });
      }
    }
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.token !== this.state.token) {
  //     return true;
  //   }
  // }
  like = () => {
    this.props.like(this.props.token, this.props.data._id);
    if (this.props.likedBy.indexOf(this.props.data._id) !== -1) {
      this.props.match(
        this.props.token,
        this.props.data._id,
        this.props.matches
      );
    }
  };
  superlike = () => {
    this.props.superlike(this.props.token, this.props.data._id);
    if (this.props.superLikedBy.indexOf(this.props.data._id) !== -1) {
      this.props.match(
        this.props.token,
        this.props.data._id,
        this.props.matches
      );
    }
  };
  block = () => {
    this.props.block(this.props.token, this.props.data._id);
  };

  render() {
    const data = this.state.data;
    console.log("propsss", this.state);
    return (
      <div id='booCard'>
        {this.props.data && (
          <Card
            hoverable
            style={
              data._id === this.state.superlike
                ? { width: 370, background: "#9AE6F7  " }
                : { width: 370 }
            }
            cover={<img alt='example' src={data.profilepic} />}>
            <Meta
              title={data.name}
              description={
                data._id === this.state.superlike ? (
                  <div>
                    <h1>{data.name} has superliked you</h1>
                    <div className='icons'>
                      <hr />
                      <div className='heart' onClick={this.like}>
                        <i class='fas fa-heart ' />
                      </div>
                      <div className='block' onClick={this.block}>
                        <i class='fas fa-times-circle ' />
                      </div>
                      <div className='star' onClick={this.superlike}>
                        <i class='fas fa-star' />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='icons'>
                    <hr />
                    <div className='heart' onClick={this.like}>
                      <i class='fas fa-heart ' />
                    </div>
                    <div className='block' onClick={this.block}>
                      <i class='fas fa-times-circle ' />
                    </div>
                    <div className='star' onClick={this.superlike}>
                      <i class='fas fa-star' />
                    </div>
                  </div>
                )
              }
            />
          </Card>
        )}
      </div>
    );
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserCard)
);
