import React from "react";
import { Col } from "reactstrap";

class Welcome extends React.PureComponent {
  render = () => {
    const { welcome } = this.props;
    return (
      <Col>
        <h4>{welcome}</h4>
      </Col>
    );
  };
}

export default Welcome;
