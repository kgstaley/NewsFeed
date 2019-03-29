import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle
} from "reactstrap";
import { withRouter } from "react-router-dom";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutMsg: "Redirecting you to the landing page."
    };
  }

  componentDidMount = () => {
    setTimeout(() => this.props.history.push(`/`), 2000);
    this.props.logout();
  };

  render = () => {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col
            sm={{ size: 4, offset: 4 }}
            md={{ size: 4, offset: 4 }}
            lg={{ size: 4, offset: 4 }}
          >
            <h4>Logging you out...</h4>
            <Card>
              <CardHeader>
                <CardTitle>Logout</CardTitle>
              </CardHeader>
              <CardBody>
                <p>{this.state.logoutMsg}</p>
              </CardBody>
              <CardFooter>NewsFeed</CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
}

export default withRouter(Logout);
