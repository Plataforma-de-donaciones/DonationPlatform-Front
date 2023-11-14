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
  margin-top: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;

  width: 100px;
  height: 30px;

  background-color: rgba(141, 202, 170, 1);
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition-duration: 0.4s;

  &:hover {
    background-color: rgba(79,181,139, 1);
  }
`;

const RegistrateText = styled.span`
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 550;
  text-decoration: underline;

  @media (max-width: 350px) {
    font-size: 12px;
  }
`;

export default Registratebutton1;
