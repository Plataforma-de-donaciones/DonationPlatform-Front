import React, { Component } from "react";
import styled, { css } from "styled-components";

function MotivoDeSolicitudVolBox(props) {
  return (
    <Container {...props}>
      <Label>Describa las tareas que podría realizar *</Label>
      <InputStyle placeholder="Describa el voluntariado"></InputStyle>
      <Helper>Este dato se visualiza únicamente por el donatario. Asimismo, indique las condiciones del voluntariado.</Helper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: transparent;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
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

const Helper = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
  font-style: normal;
  font-weight: 400;
  left: 0px;
  width: 375px;
  top: 67px;
  height: 23px;
`;

export default MotivoDeSolicitudVolBox;
