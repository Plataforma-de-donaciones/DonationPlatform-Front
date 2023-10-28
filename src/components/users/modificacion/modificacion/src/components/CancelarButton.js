import React from "react";
import styled from "styled-components";

function CancelarButton(props) {
  return (
    <Container {...props}>
      <CancelarText>Cancelar</CancelarText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(155, 155, 155, 1);
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 100px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 1px 5px 0.35px #000;

  @media screen and (max-width: 768px) {
    /* Ajustar estilos para pantallas más pequeñas */
    min-width: 60px;
    padding-left: 12px;
    padding-right: 12px;
  }
`;

const CancelarText = styled.span`
  font-family: Roboto;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
`;

export default CancelarButton;
