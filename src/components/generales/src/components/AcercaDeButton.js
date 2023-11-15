import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

function AcercaDeButton(props) {
  const history = useHistory();

  const handleClick = () => {
    history.push("/acercadenosotros");
  };

  return (
    <Container {...props} onClick={handleClick}>
      <AcercaDe>Acerca de</AcercaDe>
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 5px;
  border: none; /* Elimina el borde predeterminado de los botones */
  cursor: pointer; /* Cambia el cursor al puntero cuando se pasa por encima */
`;

const AcercaDe = styled.span`
  color: rgba(100,100,100, 1);
  font-size: 14px;
  font-weight: 500;
  &:hover {
    color: #FFFFFF;
  }
`;

export default AcercaDeButton;
