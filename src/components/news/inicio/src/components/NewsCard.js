import React from "react";
import styled from "styled-components";

const NewsCard = ({ news }) => {
  // Verifica si news es undefined o null antes de acceder a sus propiedades
  if (!news) {
    return null; // O manejar el caso de objeto no definido según tus necesidades
  }

  return (
    <CardContainer>
      <Title>{news.new_name}</Title>
      <Description>{news.new_description}</Description>
      {/* Otros detalles de la tarjeta */}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  background-color: rgba(141, 202, 170, 1);
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: 500px; 
  height: 300px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra */
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05); /* Efecto de escala en el hover */
  }
`;

const Title = styled.h3`
  color: rgba(80,80,80, 1); /* Color del texto titulo */
`;

const Description = styled.p`
color: rgba(100,100,100, 1); /* Color del texto */
`;

export default NewsCard;
