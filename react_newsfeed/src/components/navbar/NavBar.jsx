import React from "react";
import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from "reactstrap";

class NavBar extends React.Component {
  render = () => {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/home">NewsFeed</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/feed">Feed</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/users">Users</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/logout">Logout</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  };
}

export default NavBar;
