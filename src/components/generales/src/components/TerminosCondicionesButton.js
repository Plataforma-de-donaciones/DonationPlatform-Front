import React from "react";
import styled from "styled-components";

function TerminosCondicionesButton(props) {
  // Agrega un manejador de eventos onClick
  const handleClick = () => {
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
  border: none; /* Elimina el borde predeterminado de los botones */
  cursor: pointer; /* Cambia el cursor al puntero cuando se pasa por encima */
`;

const Caption = styled.span`
  color: rgba(100,100,100, 1);
  font-size: 14px;
  font-weight: bold;
    
  &:hover {
    color: #FFFFFF;
  }
`;

export default TerminosCondicionesButton;
