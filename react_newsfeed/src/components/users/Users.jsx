import React from "react";
import MapUsers from "./MapUsers";
import * as userServices from "../../services/userServices";
import { Row, Col } from "reactstrap";
import EditUser from "./EditUser";
import UserInfo from "../users/UserInfo";
import NavBar from "../navbar/NavBar";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: {},
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

  updateUser = user => {
    console.log(user);
    userServices
      .updateUser(user)
      .then(this.onUpdateUserSuccess)
      .catch(this.onUpdateUserFail);
  };

  deleteUser = id => {
    userServices
      .deleteUser(id)
      .then(this.onDeleteUserSuccess)
      .catch(this.onDeleteUserFail);
  };

  handleChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [key]: val
      }
    }));
  };

  //#region toggle

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleUserModal = () => {
    this.setState({ userModal: !this.state.userModal });
  };

  toggleEditModal = () => {
    this.setState({ editModal: !this.state.editModal, user: {} });
  };

  //#endregion

  //#region onSuccess & onFail functions

  onGetUsersSuccess = res => {
    this.setState({ users: res.recordset });
  };

  onGetUsersFail = err => {
    console.log(`Failed to get all users.`, err);
  };

  onGetUserByIdSuccess = res => {
    this.setState({
      userModal: true,
      user: res.recordsets[0]
    });
  };

  onGetUserByIdFail = err => {
    console.log(`Failed to get user by ID.`, err);
  };

  onEditUserSuccess = res => {
    this.setState({
      editModal: true,
      user: res.recordset[0]
    });
  };

  onEditUserFail = err => {
    console.log(`Failed to edit user.`, err);
  };

  onUpdateUserSuccess = res => {
    this.toggleEditModal();
    this.loadUsers();
  };

  onUpdateUserFail = err => {
    console.log(`Failed to update user.`, err);
  };

  onDeleteUserSuccess = res => {
    this.loadUsers();
  };

  onDeleteUserFail = err => {
    console.log(`Failed to delete user.`, err);
  };

  //#endregion

  render = () => {
    const { users, user, editModal, userModal } = this.state;
    return (
      <div className="Users">
        <NavBar />
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
              <EditUser
                user={user}
                editModal={editModal}
                toggleEditModal={this.toggleEditModal}
                handleChange={this.handleChange}
                updateUser={this.updateUser}
              />
            ) : null}
          </Col>
        </Row>
      </div>
    );
  };
}

export default Users;
