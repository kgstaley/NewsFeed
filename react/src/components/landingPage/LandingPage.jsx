import React from "react";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: "Welcome"
    };
  }

  render = () => {
    return <div>{this.state.welcome}</div>;
  };
}

export default LandingPage;
