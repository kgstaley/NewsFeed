import React from "react";
import {
  Navbar,
  Nav,
  NavbarBrand,
  Collapse,
  NavItem,
  NavLink
} from "reactstrap";
import * as feedServices from "../../services/feedServices";
import MapFeed from "./MapFeed";
import CreatePost from "./CreatePost";
// import UserPosts from "./UserPosts";
import * as styles from "./feed.module.css";
import PostContainer from "../../containers/PostContainer";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      postModal: false
    };
  }

  componentDidMount = () => {
    this.loadNewsFeed();
  };

  loadNewsFeed = () => {
    feedServices
      .getTopNews()
      .then(this.onGetTopNewsSuccess)
      .catch(this.onGetTopNewsFail);
  };

  redirectToUrl = url => {
    console.log(url);
    document.location.assign(url);
  };

  togglePostModal = () => {
    this.setState({ postModal: !this.state.postModal });
  };

  onGetTopNewsSuccess = res => {
    const { news } = this.state;
    console.log(`Successful GET of news feed.`, res.articles);
    if (news.length > 0) {
      this.setState(prevState => {
        const newFeed = [...prevState.news, res.articles];
        return { news: newFeed };
      });
    } else {
      this.setState({ news: res.articles });
    }
  };

  onGetTopNewsFail = err => {
    console.log(`Failed to get news feed.`, err);
  };

  onCreatePostSuccess = res => {
    console.log(`Successfully created a new post!`, res);
  };

  onCreatePostFail = err => {
    console.log(`Failed to create a new post.`, err);
  };

  render = () => {
    const { news, postModal } = this.state;
    return (
      <div className="FeedContainer">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/home">NewsFeed</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  onClick={this.togglePostModal}
                  className={styles.CreatePostNavLink}
                >
                  Create a post
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/users">Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/logout">Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div>
          <MapFeed news={news} redirectToUrl={this.redirectToUrl} />
          {postModal ? (
            <CreatePost
              postModal={postModal}
              togglePostModal={this.togglePostModal}
            />
          ) : null}
          <PostContainer />
        </div>
      </div>
    );
  };
}

export default Feed;
