import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardText } from "reactstrap";
import * as styles from "./feed.module.css";

const MapFeed = ({ news }) => {
  return news.map(article => {
    return (
      <Row key={article.url}>
        <Col
          sm={{ size: 8, offset: 2 }}
          md={{ size: 8, offset: 2 }}
          lg={{ size: 8, offset: 2 }}
        >
          <Card className={styles.MapFeedCard}>
            <h3>{article.title}</h3>
            <img
              src={article.urlToImage}
              alt="article"
              className={styles.ArticleImage}
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
  news: PropTypes.array
};

export default React.memo(MapFeed);
