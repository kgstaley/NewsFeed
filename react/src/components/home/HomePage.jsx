import React from "react";
import MapUsers from "./MapUsers";
import * as userServices from "../../services/userServices";
import {
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse
} from "reactstrap";
import EditUser from "./EditUser";
import UserInfo from "./UserInfo";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      users: [],
      user: [],
      isOpen: false,
      editModal: false,
      userModal: false
    };
  }

  componentDidMount = () => {
    this.loadUsers();
  };

  loadUsers = () => {
    userServices
      .getUsers()
      .then(this.onGetUsersSuccess)
      .catch(this.onGetUsersFail);
  };

  getUser = id => {
    userServices
      .getUser(id)
      .then(this.onGetUserByIdSuccess)
      .catch(this.onGetUserByIdFail);
  };

  editUser = id => {
    userServices
      .getUser(id)
      .then(this.onEditUserSuccess)
      .catch(this.onEditUserFail);
  };

  deleteUser = id => {
    userServices
      .deleteUser(id)
      .then(this.onDeleteUserSuccess)
      .catch(this.onDeleteUserFail);
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleUserModal = () => {
    this.setState({ userModal: !this.state.userModal });
  };

  onGetUsersSuccess = res => {
    console.log(`Successful GET of all users`, res.recordset);
    this.setState({ users: res.recordset });
  };

  onGetUsersFail = err => {
    console.log(`Failed to get all users.`, err);
  };

  onGetUserByIdSuccess = res => {
    console.log(`Successful get user by ID.`, res);
    this.setState({
      userModal: true,
      user: res.recordsets[0]
    });
  };

  onGetUserByIdFail = err => {
    console.log(`Failed to get user by ID.`, err);
  };

  onEditUserSuccess = res => {
    console.log(`Editing user ${res.recordset[0].Id}`);
    this.setState({
      editModal: true
    });
  };

  onEditUserFail = err => {
    console.log(`Failed to edit user.`, err);
  };

  onDeleteUserSuccess = res => {
    console.log(`Successfully deleted user.`, res);
    this.loadUsers();
  };

  onDeleteUserFail = err => {
    console.log(`Failed to delete user.`, err);
  };

  render = () => {
    const { users, user, editModal, userModal } = this.state;
    return (
      <div className="HomePage">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">NewsFeed</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/feed">Feed</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/logout">Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Row>
          <Col sm={{ size: 4, offset: 4 }}>
            <h1>Users</h1>
            <MapUsers
              users={users}
              editUser={this.editUser}
              deleteUser={this.deleteUser}
              getUser={this.getUser}
            />
            {userModal ? (
              <UserInfo
                user={user}
                userModal={userModal}
                toggleUserModal={this.toggleUserModal}
              />
            ) : null}
            {editModal ? (
              <EditUser users={users} editModal={editModal} />
            ) : null}
          </Col>
        </Row>
      </div>
    );
  };
}

export default HomePage;
