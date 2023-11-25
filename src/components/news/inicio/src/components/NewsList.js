import React, { useState } from "react";
import styled from "styled-components";
import NewsListItem from "./NewsListtItem"; 
import { Col, Row } from "react-bootstrap";

const NewsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinea a la izquierda */
  margin-left: 16px; /* Ajusta según sea necesario */
`;

const Pagination = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const PageButton = styled.button`
  padding: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "#ddd" : "transparent")};
  border: 1px solid #ddd;
`;

const NewsList = ({ newsList }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentNews = newsList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(newsList.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>

      {currentNews.map((news) => (
        <NewsListItem key={news.new_id} news={news} />
      ))}



      <Pagination>
        <PageButton onClick={prevPage} disabled={currentPage === 1}>
          Anterior
        </PageButton>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PageButton
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            isActive={currentPage === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
        <PageButton onClick={nextPage} disabled={currentPage === totalPages}>
          Siguiente
        </PageButton>
      </Pagination>
    </>

  );
};

export default NewsList;
