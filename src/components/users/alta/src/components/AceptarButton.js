import React from "react";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  background-color: rgba(255, 152, 0, 1);
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 100px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 1px 5px 0.35px #000;
  border: none;
  outline: none;
  cursor: pointer;
  
  /* Estilos para cuando el botón está deshabilitado */
  &:disabled {
    background-color: rgba(255, 152, 0, 0.5);
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    min-width: 60px;
    padding-left: 12px;
    padding-right: 12px;
  }
`;

const AceptarText = styled.span`
  color: #fff;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

function AceptarButton(props) {
  return (
    <Button type="button" {...props}>
      <AceptarText>Aceptar</AceptarText>
    </Button>
  );
}

export default AceptarButton;
