import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

function TerminosCondicionesButton(props) {
  const history = useHistory();

  const handleClick = () => {
    history.push("/terminoscondiciones");
  };

  return (
    <Container {...props} onClick={handleClick}>
      <Caption>Términos y condiciones</Caption>
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: transparent;
  border: none; /* Elimina el borde predeterminado de los botones */
  padding: 0; /* Elimina el relleno predeterminado del botón */
  cursor: pointer; // Cambia el cursor al pasar el mouse
`;

const Caption = styled.span`
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-weight: 500;
`;

export default TerminosCondicionesButton;
