import React from "react";
import * as registerServices from "../../services/userServices";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as styles from "./register.module.css";
import PropTypes from "prop-types";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      email: " ",
      password: "",
      usernameValid: null,
      firstnameValid: null,
      lastnameValid: null,
      emailValid: null,
      passwordValid: null,
      formValid: null
    };
  }

  componentDidMount = () => {
    console.log(`mounting register`);
  };

  handleChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState(
      {
        [key]: val
      },
      this.formIsValid
    );
    // validation on handleChange
    if (key === "username" && val.length >= 2) {
      this.setState({ usernameValid: true });
    }
    if (key === "username" && val.length < 2) {
      this.setState({ usernameValid: false });
    }
    if (key === "username" && val === "") {
      this.setState({ usernameValid: null });
    }
    if (key === "firstname" && val.length >= 2) {
      this.setState({ firstnameValid: true });
    }
    if (key === "firstname" && val.length < 2) {
      this.setState({ firstnameValid: false });
    }
    if (key === "firstname" && val === "") {
      this.setState({ firstnameValid: null });
    }
    if (key === "lastname" && val.length >= 2) {
      this.setState({ lastnameValid: true });
    }
    if (key === "lastname" && val.length < 2) {
      this.setState({ lastnameValid: false });
    }
    if (key === "lastname" && val === "") {
      this.setState({ lastnameValid: null });
    }
    if (key === "email" && /@/gi.test(val)) {
      this.setState({ emailValid: true });
    }
    if (key === "email" && !/@/gi.test(val)) {
      this.setState({ emailValid: false });
    }
    if (key === "email" && val === "") {
      this.setState({ emailValid: null });
    }
    if (
      key === "password" &&
      /^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}/gi.test(val)
    ) {
      this.setState({
        passwordValid: true
      });
    }
    if (
      key === "password" &&
      !/(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}/gi.test(val)
    ) {
      this.setState({ passwordValid: false });
    }
    if (key === "password" && val === "") {
      this.setState({ passwordValid: null });
    }
  };

  formIsValid = () => {
    if (
      this.state.usernameValid &&
      this.state.firstnameValid &&
      this.state.lastnameValid &&
      this.state.emailValid &&
      this.state.passwordValid
    ) {
      this.setState({ formValid: true });
    } else {
      this.setState({ formValid: false });
    }
  };

  submit = () => {
    const payload = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password
    };
    registerServices
      .registerUser(payload)
      .then(this.onRegSuccess)
      .catch(this.onRegFail);
  };

  cancel = () => {
    this.props.history.push(`/login`);
  };

  onRegSuccess = res => {
    console.log(`Successful registration.`, res);
    this.props.history.push("/home");
  };

  onRegFail = err => {
    console.log(`Failed to register new user.`, err);
  };

  render = () => {
    const {
      username,
      firstname,
      lastname,
      email,
      password,
      formValid
    } = this.state;
    return (
      <Row>
        <Col sm={{ size: 4, offset: 4 }}>
          <h1>Account Registration</h1>
          <Form>
            <FormGroup>
              <Label>Username:</Label>
              <Input
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                onChange={this.handleChange}
              />
            </FormGroup>
            {this.state.usernameValid === false && (
              <p className="frmWarning">
                This field is required and must be between 2-50 characters
              </p>
            )}
            <FormGroup>
              <Label>First Name:</Label>
              <Input
                type="text"
                name="firstname"
                value={firstname}
                placeholder="First Name"
                onChange={this.handleChange}
              />
            </FormGroup>
            {this.state.firstnameValid === false && (
              <p className="frmWarning">
                This field is required and must be between 2-50 characters
              </p>
            )}
            <FormGroup>
              <Label>Last Name:</Label>
              <Input
                type="text"
                name="lastname"
                value={lastname}
                placeholder="Last Name"
                onChange={this.handleChange}
              />
            </FormGroup>
            {this.state.lastnameValid === false && (
              <p className="frmWarning">
                This field is required and must be between 2-50 characters
              </p>
            )}
            <FormGroup>
              <Label>Email:</Label>
              <Input
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
              />
            </FormGroup>
            {this.state.emailValid === false && (
              <p className="frmWarning">
                This field is required and must be contain a valid email address
              </p>
            )}
            <FormGroup>
              <Label>Password:</Label>
              <Input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />
            </FormGroup>
            {this.state.passwordValid === false && (
              <p className="frmWarning">
                This field is required and must contain one capital, one
                lowercase, one numeric and one special symbol and be at least 8
                characters long
              </p>
            )}
            <div className="float-right">
              <Button
                onClick={this.cancel}
                color="danger"
                size="sm"
                className={styles.CancelRegister}
              >
                Cancel
              </Button>
              <Button
                onClick={this.submit}
                color="primary"
                size="sm"
                className={styles.SubmitRegister}
                disabled={!formValid}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    );
  };
}

Register.propTypes = {
  history: PropTypes.object
};

export default Register;
