import React from "react";
import * as userServices from "../../services/userServices";
import NavBar from "../navbar/NavBar";
import * as styles from "./homepage.module.css";
import UserUploads from "../fileUpload/UserUploads";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }

  componentDidMount = () => {
    this.loadUserInfo();
  };

  loadUserInfo = () => {
    userServices
      .getUser(22)
      .then(this.onGetUserByIdSuccess)
      .catch(this.onGetUserByIdFail);
  };

  onGetUserByIdSuccess = res => {
    console.log(`Successfully grabbed user.`, res.recordset);
    this.setState({ user: res.recordset[0] });
  };

  onGetUserByIdFail = err => {
    console.log(`Failed to grab by user Id`, err);
  };

  render = () => {
    const { user } = this.state;
    return (
      <div>
        <NavBar />
        <h3 className={styles.HomePageHeader}>
          Welcome, {user.Firstname} {user.Lastname}
        </h3>
        <UserUploads />
      </div>
    );
  };
}

export default HomePage;
