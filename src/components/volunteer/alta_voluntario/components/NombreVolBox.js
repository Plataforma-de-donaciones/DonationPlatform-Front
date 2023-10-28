import React, { Component } from "react";
import styled, { css } from "styled-components";

function NombreVolBox(props) {
  return (
    <Container {...props}>
      <StackedLabel>¿Cuál es su nombre? *</StackedLabel>
      <InputStyle
        placeholder="Nombre del voluntario/a"
        maxLength={50}
      ></InputStyle>
      <HelperText>Esto dato se visualiza en la publicación.</HelperText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: transparent;
  flex-direction: column;
`;

const StackedLabel = styled.span`
  font-size: 12px;
  text-align: left;
  color: rgba(0,0,0,1);
  opacity: 0.6;
  padding-top: 16px;
  font-style: normal;
  font-weight: 700;
  left: 0px;
  width: 375px;
  top: 0px;
  height: 31px;
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

const HelperText = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
  font-style: normal;
  font-weight: 400;
`;

export default NombreVolBox;
