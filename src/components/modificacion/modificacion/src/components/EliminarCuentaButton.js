import React, { Component } from "react";
import styled, { css } from "styled-components";

function EliminarCuentaButton(props) {
  return (
    <Container {...props}>
      <EliminarCuentaText>Eliminar cuenta</EliminarCuentaText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(255,152,0,1);
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 100px;
  padding-left: 16px;
  padding-right: 16px;
  opacity: 0.6;
  box-shadow: 0px 1px 5px  0.35px rgba(0,0,0,1) ;
`;

const EliminarCuentaText = styled.span`
  font-family: Roboto;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

export default EliminarCuentaButton;
