import React, { useState } from "react";
import styled from "styled-components";
import EquipamientoMedicoListItem from "./EquipamientoMedicoListItem"; // Ajusta la importación según la ubicación de tu componente EquipamientoMedicoListItem

const EquipamientoMedicoListContainer = styled.div`
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

const EquipamientoMedicoList = ({ equipamientoList }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular índices de inicio y fin para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtener el equipamiento médico para la página actual
  const currentEquipamiento = equipamientoList.slice(startIndex, endIndex);

  // Calcular la cantidad total de páginas
  const totalPages = Math.ceil(equipamientoList.length / itemsPerPage);

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
    <EquipamientoMedicoListContainer>
      {currentEquipamiento.map((equipamiento) => (
        <EquipamientoMedicoListItem key={equipamiento.eq_id} equipamiento={equipamiento} />
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
    </EquipamientoMedicoListContainer>
  );
};

export default EquipamientoMedicoList;
