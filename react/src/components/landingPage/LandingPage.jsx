import React from "react";
import Welcome from "./Welcome";
import PropTypes from "prop-types";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: "Welcome.",
      header: "This is NewsFeed."
    };
  }

  enter = () => {
    this.props.history.push(`/register`);
  };

  render = () => {
    const { welcome, header } = this.state;
    return (
      <div>
        <Welcome welcome={welcome} header={header} enter={this.enter} />
      </div>
    );
  };
}

LandingPage.propTypes = {
  history: PropTypes.object
};

export default LandingPage;
