import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button, ButtonGroup } from "reactstrap";
import * as styles from "./feed.module.css";

const MapPosts = ({ posts, deletePost, getPostById }) => {
  return posts.map(post => {
    return (
      <Row>
        <Col>
          <Card key={post.Id} className={styles.MapPost}>
            <p>{post.Body}</p>
            <small>{post.DateCreated}</small>
            <br />
            <ButtonGroup>
              <Button
                type="button"
                size="sm"
                color="danger"
                onClick={() => deletePost(post.Id)}
              >
                Delete
              </Button>
              <Button
                type="button"
                size="sm"
                color="warning"
                onClick={() => getPostById(post.Id)}
              >
                Edit
              </Button>
            </ButtonGroup>
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
