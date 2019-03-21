import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./components/register/Register";
import LandingPage from "./components/landingPage/LandingPage";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    );
  }
}

export default App;
