import React from "react";
import MapUsers from "./MapUsers";
import * as userServices from "../../services/userServices";
import { Row, Col } from "reactstrap";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      users: []
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

  editUser = id => {
    userServices
      .getUser(id)
      .then(this.onGetUserByIdSuccess)
      .catch(this.onGetUserByIdFail);
  };

  deleteUser = id => {
    userServices
      .deleteUser(id)
      .then(this.onDeleteUserSuccess)
      .catch(this.onDeleteUserFail);
  };

  onGetUsersSuccess = res => {
    console.log(`Successful GET of all users`, res);
    this.setState({ users: res.recordset });
  };

  onGetUsersFail = err => {
    console.log(`Failed to get all users.`, err);
  };

  onGetUserByIdSuccess = res => {
    console.log(`Successful get user by ID.`, res);
  };

  onGetUserByIdFail = err => {
    console.log(`Failed to get user by ID.`, err);
  };

  onDeleteUserSuccess = res => {
    console.log(`Successfully deleted user.`, res);
  };

  onDeleteUserFail = err => {
    console.log(`Failed to delete user.`, err);
  };

  render = () => {
    const { users } = this.state;
    return (
      <div className="HomePage">
        <Row>HomePage</Row>
        <Row>
          <Col sm={{ size: 4, offset: 4 }}>
            <h1>Users</h1>
            <MapUsers
              users={users}
              editUser={this.editUser}
              deleteUser={this.deleteUser}
            />
          </Col>
        </Row>
      </div>
    );
  };
}

export default HomePage;
