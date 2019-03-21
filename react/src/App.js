import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./components/register/Register";
import LandingPage from "./components/landingPage/LandingPage";
import HomePage from "./components/home/HomePage";
import Feed from "./components/feed/Feed";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route path="/home" component={HomePage} />
          <Route exact path="/feed" component={Feed} />
        </Switch>
      </div>
    );
  }
}

export default App;
