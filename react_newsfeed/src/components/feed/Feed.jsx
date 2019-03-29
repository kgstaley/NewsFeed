import React from "react";
import {
  Row,
  Col,
  Navbar,
  Nav,
  NavbarBrand,
  Collapse,
  NavItem,
  NavLink
} from "reactstrap";
import * as feedServices from "../../services/feedServices";
import MapFeed from "./MapFeed";
import * as styles from "./feed.module.css";
import PostContainer from "../../containers/PostContainer";
import NewPost from "../../containers/NewPost";
import { withRouter } from "react-router-dom";

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
    const { postModal } = this.state;
    this.setState({ postModal: !postModal }, this.resetPostId);
  };

  resetPostId = () => {
    const { postModal } = this.state;
    if (!postModal) {
      this.props.resetPostId();
    } else {
      console.log(`Do nothing.`);
    }
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

  historyPush = route => {
    this.props.history.push(`/${route}`);
  };

  render = () => {
    const { news, postModal } = this.state;
    return (
      <div className="FeedContainer">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand onClick={() => this.historyPush(`home`)}>
            NewsFeed
          </NavbarBrand>
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
                <NavLink onClick={() => this.historyPush(`users`)}>
                  Users
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.historyPush(`logout`)}>
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Row>
          <Col
            sm={{ size: 5, offset: 1 }}
            md={{ size: 5, offset: 1 }}
            lg={{ size: 5, offset: 1 }}
          >
            <MapFeed news={news} redirectToUrl={this.redirectToUrl} />
          </Col>
          <Col
            sm={{ size: 5, offset: 1 }}
            md={{ size: 5, offset: 1 }}
            lg={{ size: 5, offset: 1 }}
          >
            <PostContainer
              postModal={postModal}
              togglePostModal={this.togglePostModal}
            />
          </Col>
        </Row>
        <div>
          {postModal ? (
            <NewPost
              postModal={postModal}
              togglePostModal={this.togglePostModal}
            />
          ) : null}
        </div>
      </div>
    );
  };
}

export default withRouter(Feed);
