import React, { Component } from "react";

import { withRouter,Link } from "react-router-dom";
import { Layout,Empty,Button } from "antd";
import Nav from "./Nav";
import MainFrame from "./UserInteraction";
import UnAuth from './UnAuth'
import { connect } from "react-redux";

import actions from "../Store/UI/action";

const mapDispatchToProps = dispatch => ({
  // fetchAll: () => dispatch(actions.fetchAll())
});
const mapStateToProps = state => ({
  // token: state.Auth.token
});

const { Content } = Layout;

class Dashboard extends Component {
  render() {

    return (
      <div>
        <Layout>
          <Nav />
          <div>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                marginTop: 35,
                minHeight: 280
              }}>
              {this.props.auth ? (
                <MainFrame />
              ) : (
                <>
                <UnAuth></UnAuth>

                  {/* <Empty
                    imageStyle={{
                      height: 80
                    }}
                    >
                    <Button type='primary'>
                      <Link to='/register'>
                        Please Login or Signup To continue
                      </Link>
                    </Button>
                  </Empty> */}
                </>
              )}
            </Content>
          </div>
        </Layout>
        )
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
