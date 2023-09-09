import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialHeader11(props) {
  return (
    <Container {...props}>
      <TextWrapper>
        <IniciarSesion numberOfLines={1}>Iniciar sesión</IniciarSesion>
      </TextWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(255,152,0,0.59);
  flex-direction: row;
  align-items: center;
  padding: 4px;
  justify-content: center;
  box-shadow: 0px 2px 1.2px  0.2px #111 ;
`;

const TextWrapper = styled.div`
  flex-direction: column;
  display: flex;
  align-self: center;
`;

const IniciarSesion = styled.span`
  font-family: Roboto;
  font-size: 18px;
  color: rgba(0,0,0,1);
  background-color: transparent;
  line-height: 18px;
  font-weight: 600;
`;

export default MaterialHeader11;
