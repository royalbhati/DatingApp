import React from 'react'
import { Result, Button } from "antd";
import {withRouter} from 'react-router-dom'

const StatusMap = {
  "403": {
    title: "404! Boo not Found",
    subTitle: "Please Login or Signup To find your Boo!",
  },
};

class ResultDemo extends React.Component {
  state = {
    status: "403"
  };
  onClick =() =>{
    this.props.history.push("/register")
  }

  render() {
    const { status } = this.state;
    const resultProps = StatusMap[status];
    return (
      <div>
        <Result status={status} {...resultProps} />
        <div style={{ textAlign: "center" }}>
          <Button type='primary' onClick={this.onClick}>
          SignUp 
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(ResultDemo)