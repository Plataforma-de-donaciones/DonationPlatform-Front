import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

function PreguntasButton(props) {

  const history = useHistory();

  const handleClick = () => {
    history.push("/preguntasfrecuentes");
  };

  return (
    <Container {...props} onClick={handleClick}>
      <PreguntasFrecuentes>Preguntas frecuentes</PreguntasFrecuentes>
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  border: none; /* Elimina el borde predeterminado de los botones */
  cursor: pointer; /* Cambia el cursor al puntero cuando se pasa por encima */
`;

const PreguntasFrecuentes = styled.span`
  color: rgba(100,100,100, 1);
  font-size: 14px;
  font-weight: 500;
    
  &:hover {
    color: #FFFFFF;
  }
`;

export default PreguntasButton;
