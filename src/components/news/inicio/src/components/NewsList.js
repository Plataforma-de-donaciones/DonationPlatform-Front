import React, { useState } from "react";
import styled from "styled-components";
import NewsListItem from "./NewsListtItem"; // Ajusta la importación según la ubicación de tu componente NewsListItem

const NewsList = ({ newsList }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular índices de inicio y fin para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtener las noticias para la página actual
  const currentNews = newsList.slice(startIndex, endIndex);

  // Calcular la cantidad total de páginas
  const totalPages = Math.ceil(newsList.length / itemsPerPage);

  // Función para cambiar a la página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Función para cambiar a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <NewsListContainer>
      {currentNews.map((news) => (
        <NewsListItem key={news.new_id} news={news} />
      ))}

      {/* Paginación */}
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
    </NewsListContainer>
  );
};

const NewsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinea a la izquierda */
`;

const Pagination = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  padding-left: 8px;
`;

const PageButton = styled.button`
  padding: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "rgba(221,221,221, 1)" : "transparent")};
  border: 1px solid #ddd;
`;

export default NewsList;
