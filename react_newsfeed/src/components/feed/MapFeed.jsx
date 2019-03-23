import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardText } from "reactstrap";
import * as styles from "./feed.module.css";

const MapFeed = ({ news, redirectToUrl }) => {
  return news.map(article => {
    return (
      <Row key={article.url}>
        <Col>
          <Card className={styles.MapFeedCard}>
            <h3>{article.title}</h3>
            <img
              src={article.urlToImage}
              alt="Click to redirect to source"
              title="Click to redirect to source"
              className={styles.ArticleImage}
              onClick={() => redirectToUrl(article.url)}
            />
            <CardText>{article.publishedAt}</CardText>
            <CardText>{article.description}</CardText>
          </Card>
        </Col>
      </Row>
    );
  });
};

MapFeed.propTypes = {
  news: PropTypes.array,
  redirectToUrl: PropTypes.func
};

export default React.memo(MapFeed);
