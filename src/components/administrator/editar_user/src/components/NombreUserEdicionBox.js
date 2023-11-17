import React from "react";
import styled from "styled-components";

function NombreUserEdicionBox({ user_name }) {
  return (
    <Container>
      <PerfilNombreText>Nombre de usuario</PerfilNombreText>
      <PerfilNombreBbdd>{user_name}</PerfilNombreBbdd>
    </Container>
  );
}



const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #D9D5DC;
  background-color: transparent;
  flex-direction: column;
  width: 100%; /* Hace que el contenedor ocupe el 100% del ancho disponible */
  max-width: 600px; /* Establece un ancho máximo para mantener la legibilidad */
  margin: 0 auto; /* Centra el contenedor en la página */
`;

const PerfilNombreText = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  font-weight: 700;
`;

const PerfilNombreBbdd = styled.span`
  color: #000;
  font-size: 14px;
  align-self: stretch;
  flex: 1 1 0%;
  line-height: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #D9D5DC;
`;

export default NombreUserEdicionBox;