import React, { Component } from "react";
import styled, { css } from "styled-components";

function CorreoPerfilBox(props) {
  return (
    <Container {...props}>
      <PerfilCorreoText>Correo electrónico</PerfilCorreoText>
      <PerfilCorreoBbdd>bobesponja@gmail.com</PerfilCorreoBbdd>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #D9D5DC;
  background-color: transparent;
  flex-direction: column;
`;

const PerfilCorreoText = styled.span`
  font-family: Roboto;
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  width: 102px;
  height: 30px;
  font-weight: 700;
`;

const PerfilCorreoBbdd = styled.span`
  font-family: Roboto;
  color: #000;
  font-size: 14px;
  align-self: stretch;
  flex: 1 1 0%;
  line-height: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
`;

export default CorreoPerfilBox;
