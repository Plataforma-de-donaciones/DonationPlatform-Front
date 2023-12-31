import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

function TerminosCondicionesButton(props) {
  const history = useHistory();
  // Agrega un manejador de eventos onClick
  const handleClick = () => {
    history.push("/terminoscondiciones");
    // Agrega aquí el código que deseas ejecutar cuando se haga clic en el botón
    console.log("Botón Términos y Condiciones clickeado");
  };

  return (
    <Container {...props} onClick={handleClick}>
      <Caption>Términos y condiciones</Caption>
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

const Caption = styled.span`
color: rgba(100,100,100, 1);
font-size: 0.9rem;
font-weight: 500;
    
  &:hover {
    color: #FFFFFF;
  }
`;

export default TerminosCondicionesButton;
