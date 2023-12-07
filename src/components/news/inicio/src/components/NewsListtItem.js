// NewsListItem.js
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';

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
  const [open, setOpen] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>

      <Card className='mb-3'>
        <Card.Body>
          <Card.Title>{news.new_name}</Card.Title>

          <Collapse in={open}>
            <Card.Text className="mb-4 ms-2 text-muted text-center">
              {news.new_description}
            </Card.Text>
          </Collapse>

          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}>
            {open ? "Leer menos" : "Leer más"}
          </Button>

        </Card.Body>
      </Card>
    </>


  );
};

export default NewsListItem;
