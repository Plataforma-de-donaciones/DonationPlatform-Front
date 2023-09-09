import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialButtonDanger(props) {
  return (
    <Container {...props}>
      <Ingresar>Ingresar</Ingresar>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(255,152,0,1);
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

const Ingresar = styled.span`
  font-family: Roboto;
  color: #fff;
  font-size: 14px;
`;

export default MaterialButtonDanger;
