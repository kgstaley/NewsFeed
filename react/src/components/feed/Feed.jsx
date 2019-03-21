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

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
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

  onGetTopNewsSuccess = res => {
    const { news } = this.state;
    console.log(`Successful GET of news feed.`, res.articles);
    if (news.length === 0) {
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

  render = () => {
    const { news } = this.state;
    return (
      <div className="FeedContainer">
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
        <div>
          <MapFeed news={news} />
        </div>
      </div>
    );
  };
}

export default Feed;
