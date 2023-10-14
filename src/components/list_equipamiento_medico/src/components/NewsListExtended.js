// NewsListExtended.js
import React from "react";
import styled from "styled-components";
import NewsCardExtended from "./NewsCardExtended";

const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NewsListExtended = ({ newsList }) => {
  return (
    <NewsList>
      {newsList.map((news) => (
        <NewsCardExtended key={news.new_id} news={news} />
      ))}
    </NewsList>
  );
};

export default NewsListExtended;