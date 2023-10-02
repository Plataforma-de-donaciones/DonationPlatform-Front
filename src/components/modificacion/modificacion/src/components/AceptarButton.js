import React, { Component } from "react";
import styled, { css } from "styled-components";

function AceptarButton(props) {
  return (
    <Container {...props}>
      <AceptarText>Aceptar</AceptarText>
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
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

const AceptarText = styled.span`
  font-family: Roboto;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

export default AceptarButton;
