import React, { useState, useEffect } from "react";
import styled from "styled-components";

function TemaNewEdicionBox({ value, onChange }) {
  return (
    <Container>
      <Label>Tema de la noticia</Label>
      <InputStyle
        placeholder="Tema de la noticia"
        value={value}
        onChange={onChange}
      />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #d9d5dc;
  background-color: transparent;
  flex-direction: column;
  position: relative;
`;

const Label = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  font-style: normal;
  font-weight: 700;
`;

const InputStyle = styled.input`
  color: #000;
  font-size: 14px;
  align-self: stretch;
  flex: 1 1 0%;
  line-height: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

export default TemaNewEdicionBox;