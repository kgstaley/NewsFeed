import React from "react";
import Welcome from "./Welcome";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: "Welcome"
    };
  }

  render = () => {
    const { welcome } = this.state;
    return (
      <div>
        <Welcome welcome={welcome} />
      </div>
    );
  };
}

export default LandingPage;
