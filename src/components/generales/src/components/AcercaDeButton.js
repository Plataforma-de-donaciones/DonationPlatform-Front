import React from "react";
import styled from "styled-components";

function AcercaDeButton(props) {
  // Agrega un manejador de eventos onClick
  const handleClick = () => {
    // Agrega aquí el código que deseas ejecutar cuando se haga clic en el botón
    console.log("Botón Acerca de clickeado");
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
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-weight: 500;
`;

export default AcercaDeButton;
