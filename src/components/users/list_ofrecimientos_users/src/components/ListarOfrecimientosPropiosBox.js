import React, { useState } from "react";
import styled from "styled-components";
import OfrecimientoPropioBox from "./OfrecimientoPropioBox";

const Container = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 1);
  flex-direction: column;
`;

const Rect1 = styled.div`
  width: 800px;
  height: 35px;
  background-color: rgba(255, 152, 0, 0.6);
  flex-direction: column;
  display: flex;
  margin-top: 15px;
  box-shadow: 0px 3px 5px 0.35px rgba(0, 0, 0, 1);
`;

const MisOfrecimientos = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  width: 172px;
  height: 24px;
  text-align: center;
  margin-top: 6px;
  margin-left: 314px;
`;

const NewsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 16px;
  margin-top: 20px; /* Ajusta según sea necesario */
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

const ListarOfrecimientosPropiosBox = ({ ofrecimientos }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular índices de inicio y fin para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtener los ofrecimientos para la página actual
  const currentOfrecimientos = ofrecimientos.slice(startIndex, endIndex);

  // Calcular la cantidad total de páginas
  const totalPages = Math.ceil(ofrecimientos.length / itemsPerPage);

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
    <Container>
      <Rect1>
        <MisOfrecimientos>Mis ofrecimientos</MisOfrecimientos>
      </Rect1>
      <NewsListContainer>
        {currentOfrecimientos.map((ofrecimiento) => (
          <OfrecimientoPropioBox
            key={ofrecimiento.id} // Asegúrate de usar la propiedad correcta para la clave única
            don_name={ofrecimiento.don_name}
            don_description={ofrecimiento.don_description}
            don_attachment={ofrecimiento.don_attachment}
            request_count={ofrecimiento.request_count}
          />
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
    </Container>
  );
};

export default ListarOfrecimientosPropiosBox;
