// ContrasenaNuevaPerfilBox.js
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #D9D5DC;
  background-color: transparent;
  flex-direction: column;
  margin-bottom: 16px;
`;

const PerfilContraseñaNuevaText = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  font-weight: 700;
`;

const PerfilContraseñaNuevaBbdd = styled.input`
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
  outline: none;
  border-bottom: 1px solid #D9D5DC;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

function ContrasenaNuevaPerfilBox({ value, onChange, onBlur }) {
  return (
    <Container>
      <PerfilContraseñaNuevaText>Contraseña nueva</PerfilContraseñaNuevaText>
      <PerfilContraseñaNuevaBbdd
        type="password"
        placeholder="Contraseña nueva"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Container>
  );
}

export default ContrasenaNuevaPerfilBox;
