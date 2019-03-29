import React from "react";
import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { withRouter } from "react-router-dom";

class NavBar extends React.Component {
  historyPush = route => {
    this.props.history.push(`/${route}`);
  };

  render = () => {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand onClick={() => this.historyPush(`home`)}>
          NewsFeed
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink onClick={() => this.historyPush(`feed`)}>Feed</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => this.historyPush(`users`)}>Users</NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => {
                this.historyPush(`logout`);
              }}
            >
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  };
}

export default withRouter(NavBar);
