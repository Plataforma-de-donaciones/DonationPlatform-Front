import React from "react";
import styled from "styled-components";

function CorreoPerfilBox({ user_email }) {
  return (
    <Container>
      <PerfilCorreoText>Correo electrónico</PerfilCorreoText>
      <PerfilCorreoBbdd>{user_email}</PerfilCorreoBbdd>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #D9D5DC;
  background-color: transparent;
  flex-direction: column;
  margin-bottom: 16px; /* Añade un margen inferior */
`;

const PerfilCorreoText = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  width: 150px;
  height: 30px;
  font-weight: 700;
`;

const PerfilCorreoBbdd = styled.span`
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


  @media screen and (max-width: 768px) {
    /* Ajustar estilos para pantallas más pequeñas */
    font-size: 12px;
  }
`;

export default CorreoPerfilBox;
