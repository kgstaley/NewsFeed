import React from "react";
import * as userServices from "../../services/userServices";
import NavBar from "../navbar/NavBar";
import * as styles from "./homepage.module.css";
import UserUploads from "../fileUpload/UserUploads";
import * as fileService from "../../services/fileServices";
import MappedUserImages from "./MappedUserImages";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      files: []
    };
  }

  componentDidMount = () => {
    this.loadUserInfo();
    this.loadUserImages();
  };

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (this.state.files !== prevState.files) {
  //     this.loadUserImages();
  //   }
  // };

  loadUserImages = () => {
    fileService
      .getFiles()
      .then(this.onGetFilesSuccess)
      .catch(this.onGetFilesFail);
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

  onGetFilesSuccess = res => {
    console.log(`Successfully grabbed user files.`, res);
    this.setState({
      files: res.recordset
    });
  };

  onGetFilesFail = err => {
    console.log(`Failed to get user files.`, err);
  };

  render = () => {
    const { user } = this.state;
    return (
      <div>
        <NavBar />
        <h3 className={styles.HomePageHeader}>
          Welcome, {user.Firstname} {user.Lastname}
        </h3>
        <UserUploads loadUserImages={this.loadUserImages} />
        <MappedUserImages files={this.state.files} />
      </div>
    );
  };
}

export default HomePage;
