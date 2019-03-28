import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actions/loginAction";
import Login from "../components/login/Login";

class LoginContainer extends React.Component {
  render = () => {
    return (
      <Login userLoggedIn={this.props.userLoggedIn} login={this.props.login} />
    );
  };
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.loginReducer.userLoggedIn
  };
};

export default connect(
  mapStateToProps,
  actionCreators
)(LoginContainer);
