import React from "react";
import PropTypes from "prop-types";

const MapFeed = ({ news }) => {
  return news.map(article => {
    return (
      <div>
        <div>{article.title}</div>
        <div>{article.publishedAt}</div>
        <div>{article.description}</div>
      </div>
    );
  });
};

MapFeed.propTypes = {
  news: PropTypes.array
};

export default React.memo(MapFeed);
