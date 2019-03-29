import React from "react";
import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { withRouter } from "react-router-dom";
import * as styles from "./navbar.module.css";

class NavBar extends React.Component {
  historyPush = route => {
    this.props.history.push(`/${route}`);
  };

  render = () => {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand
          onClick={() => this.historyPush(`home`)}
          className={styles.navBarCursor}
        >
          NewsFeed
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink
              onClick={() => this.historyPush(`feed`)}
              className={styles.navBarCursor}
            >
              Feed
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => this.historyPush(`users`)}
              className={styles.navBarCursor}
            >
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => {
                this.historyPush(`logout`);
              }}
              className={styles.navBarCursor}
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
