import React, { Component } from "react";
import Card from "../Card";
import { connect } from "react-redux";
import { List, Avatar, message } from "antd";

import actions from "../../Store/UI/action";

const mapDispatchToProps = dispatch => ({
  fetchSingle: userId => dispatch(actions.fetchSingle(userId)),
  fetchAll: id => dispatch(actions.fetchAll(id)),
  match: (currentUser, likedBy, matchArr) =>
    dispatch(actions.match(currentUser, likedBy, matchArr))
});

const mapStateToProps = state => ({
  msg: state.UI.msg,
  token: state.Auth.token,
  data: state.UI.data,
  loaded: state.UI.loaded,
  isAuth: state.Auth.isAuth,
  liked: state.UI.liked,
  likedUser: state.UI.likedUser
});
class index extends Component {
  state = {
    token: "",
    msg: this.props.msg
  };
  componentDidMount() {
    this.props.fetchAll(this.props.token);
  }
  renderCards = data => {
    const cardData = data.usersToBeDisplayed[0];
    return (
      <Card
        data={cardData}
        likedBy={data.likedby}
        matches={data.matches}
        superLikedBy={data.superlikedby}
      />
    );
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.msg !== this.props.msg) {      
      if (nextProps.msg !== "Fetched Successfully")
        message.success(nextProps.msg);
      return true;
    } else {
      return false;
    }
  }
  getMatches = () => {
    if (this.props.data) {
      return this.props.data.matches.filter(elem => {
        return elem !== null;
      });
    } else {
      return [];
    }
  };
  render() {
    const matches = this.getMatches();
    return (
      <div className='contentContainer'>
        <div className='left'>
          <h1 className='matchListText'>Matches</h1>
          <List
            className='matchList'
            itemLayout='horizontal'
            dataSource={matches}
            renderItem={item => (
              <>
                {console.log("item", item)}
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.length > 0 ? item[0].profilepic : ""} />
                    }
                    title={<span>{item.length > 0 ? item[0].name : ""}</span>}
                    description={
                      item.length > 0 ? `Say Hi to ${item[0].name}` : ""
                    }
                  />
                </List.Item>
              </>
            )}
          />
        </div>

        <div className='right'>
          <h1 className='rightText'>People In Your Area</h1>
          {this.props.loaded ? (
            this.renderCards(this.props.data)
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
