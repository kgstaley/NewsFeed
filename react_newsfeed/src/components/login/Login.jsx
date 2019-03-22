import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  render = () => {
    return (
      <div>
        <div>login form will go here</div>
      </div>
    );
  };
}

export default Login;
