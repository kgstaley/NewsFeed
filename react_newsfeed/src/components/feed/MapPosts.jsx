import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card } from "reactstrap";
import * as styles from "./feed.module.css";

const MapPosts = ({ posts }) => {
  return posts.map(post => {
    return (
      <Row>
        <Col>
          <Card key={post.Id} className={styles.MapPost}>
            <p>{post.Body}</p>
            <small>{post.DateCreated}</small>
          </Card>
        </Col>
      </Row>
    );
  });
};

MapPosts.propTypes = {
  posts: PropTypes.array
};

export default React.memo(MapPosts);
