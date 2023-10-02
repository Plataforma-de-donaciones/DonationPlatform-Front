import React from "react";
import styled from "styled-components";

function ContrasenaNuevaPerfilBox(props) {
  return (
    <Container {...props}>
      <PerfilContraseñaNuevaText>Contraseña nueva</PerfilContraseñaNuevaText>
      <PerfilContraseñaNuevaBbdd
        type="password"
        placeholder="Contraseña nueva"
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #D9D5DC;
  background-color: transparent;
  flex-direction: column;
`;

const PerfilContraseñaNuevaText = styled.span`
  font-family: Roboto;
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  font-weight: 700;
`;

const PerfilContraseñaNuevaBbdd = styled.input`
  font-family: Roboto;
  color: #000;
  font-size: 14px;
  align-self: stretch;
  flex: 1;
  line-height: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border: none;
  background: transparent;
  flex-direction: column;
  outline: none; /* Elimina el resaltado del input al hacer clic */
`;

export default ContrasenaNuevaPerfilBox;
