// NewsListItem.js
import React, { useState } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: 800px; /* Ajustamos el ancho de la tarjeta */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Titlee = styled.h3`
  color: rgba(80,80,80, 1); /* Color del texto titulo */
`;

const Description = styled.p`
  display: ${props => (props.expanded ? 'block' : 'none')}; /* Mostrar u ocultar la descripción */
  color: rgba(100,100,100, 1); /* Color del texto descripcion */
`;

const ExpandButton = styled.button`
  margin-top: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;

  width: 100px;
  height: 22px;

  background-color: rgba(141, 202, 170, 0.5);
  color: rgba(80,80,80, 1);
  cursor: pointer; /* No funciona */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition-duration: 0.4s;

  &:hover { /* No funciona */
    background-color: rgba(79,181,139, 1); 
  }
`;

const NewsListItem = ({ news }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <CardContainer>
      <Titlee>{news.new_name}</Titlee>
      <Description expanded={expanded}>{news.new_description}</Description>
      <ExpandButton onClick={handleExpand}>{expanded ? 'Leer menos' : 'Leer más'}</ExpandButton>
    </CardContainer>
  );
};

export default NewsListItem;
