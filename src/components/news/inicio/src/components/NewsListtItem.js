// NewsListItem.js
import React, { useState } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: 800px; /* Ajustamos el ancho de la tarjeta */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Description = styled.p`
  display: ${props => (props.expanded ? 'block' : 'none')}; /* Mostrar u ocultar la descripción */
`;

const ExpandButton = styled.button`
  margin-top: 8px;
`;

const NewsListItem = ({ news }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <CardContainer>
      <h3>{news.new_name}</h3>
      <Description expanded={expanded}>{news.new_description}</Description>
      <ExpandButton onClick={handleExpand}>{expanded ? 'Less' : 'More'}</ExpandButton>
    </CardContainer>
  );
};

export default NewsListItem;
