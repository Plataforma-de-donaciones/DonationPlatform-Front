import React, { Component } from "react";
import styled, { css } from "styled-components";

function NombreDonSolicitudBox(props) {
  return (
    <Container {...props}>
      <CualEsSuNombre>¿Cúal es su nombre?</CualEsSuNombre>
      <InputStyle placeholder="Ingrese su nombre"></InputStyle>
      <Helper>Este dato se visualiza únicamente por el donatario.</Helper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: transparent;
  flex-direction: column;
`;

const CualEsSuNombre = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  font-style: normal;
  font-weight: 700;
`;

const InputStyle = styled.input`
  border-bottom-width: 1px;
  border-color: #D9D5DC;
  color: #000;
  font-size: 14px;
  align-self: stretch;
  line-height: 16px;
  padding-top: 8px;
  flex: 1 1 0%;
  padding-bottom: 8px;
  width: 375px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

const Helper = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
`;

export default NombreDonSolicitudBox;
