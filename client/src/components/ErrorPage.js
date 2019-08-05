import React from "react";
import { Result, Button } from "antd";
import { withRouter } from "react-router-dom";

const StatusMap = {
  "500": {
    title: "Erro",
    subTitle: "You did something wrong! Make sure to check again"
  }
};

class Error extends React.Component {
  state = {
    status: "500"
  };
  onClick = () => {
    this.props.history.push("/");
  };

  render() {
    const { status } = this.state;
    const resultProps = StatusMap[status];
    return (
      <div>
        <Result status={status} {...resultProps} />
        <div style={{ textAlign: "center" }}>
          <Button type='primary' onClick={this.onClick}>
            Back Home
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(Error);
