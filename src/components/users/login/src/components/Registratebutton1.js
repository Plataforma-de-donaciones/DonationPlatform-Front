import React from "react";
import styled from "styled-components";

function Registratebutton1(props) {
  // Agrega un manejador de eventos onClick
  const handleClick = () => {
    // Agrega aquí el código que deseas ejecutar cuando se haga clic en el botón
    console.log("Botón Regístrate clickeado");
  };

  return (
    <Container {...props} onClick={handleClick}>
      <RegistrateText>Regístrate</RegistrateText>
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: rgba(255, 152, 0, 1);
  padding: 10px 20px; // Espaciado interior
  border: none; /* Elimina el borde predeterminado de los botones */
  cursor: pointer; // Cambia el cursor al pasar el mouse
`;

const RegistrateText = styled.span`
  color: #fff; // Texto en color blanco
  font-size: 14px;
  font-weight: 500;
`;

export default Registratebutton1;
