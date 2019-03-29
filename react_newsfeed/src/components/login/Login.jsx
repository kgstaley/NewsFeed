import React from "react";
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
  Form,
  FormGroup,
  Input,
  Button
} from "reactstrap";
import * as styles from "./login.module.css";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showLoginFailure: false
    };
  }

  handleChange = evt => {
    evt.preventDefault();
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({
      [key]: val
    });
  };

  handleLogin = evt => {
    const { username, password } = this.state;
    const payload = { username, password };
    evt.preventDefault();
    this.props
      .login(payload)
      .then(this.onLoginSuccess)
      .catch(this.onLoginFail);
  };

  onLoginSuccess = () => {
    this.props.history.push(`/home`);
  };

  onLoginFail = err => {
    console.log(`Failed to authenticate user.`, err);
    this.setState({
      showLoginFailure: true
    });
  };

  loginFailWarn = () => {
    window.alert(
      "The inputted username or password does not match our records."
    );
  };

  redirect = () => {
    this.props.history.push(`/register`);
  };

  render = () => {
    return (
      <div className={styles.loginBackground}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Row className={styles.loginStyles}>
          <Col
            sm={{ size: 4, offset: 4 }}
            md={{ size: 4, offset: 4 }}
            lg={{ size: 4, offset: 4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>NewsFeed Login</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleLogin}>
                  <FormGroup>
                    <CardText>Username: </CardText>
                    <Input
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      placeholder="Username"
                    />
                  </FormGroup>
                  <FormGroup>
                    <CardText>Password: </CardText>
                    <Input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      placeholder="Password"
                    />
                  </FormGroup>
                  {this.state.showLoginFailure ? (
                    <div>
                      The inputted username or password does not match our
                      records
                    </div>
                  ) : null}
                  <div className="float-right">
                    <Button type="submit" color="primary" size="sm">
                      Login
                    </Button>
                  </div>
                </Form>
                <Button
                  type="button"
                  size="sm"
                  color="default"
                  onClick={this.redirect}
                >
                  Don't have an account?
                </Button>
              </CardBody>
              <CardFooter>NewsFeed</CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
}

export default withRouter(Login);
