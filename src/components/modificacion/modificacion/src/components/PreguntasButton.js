import React, { Component } from "react";
import styled, { css } from "styled-components";

function PreguntasButton(props) {
  return (
    <Container {...props}>
      <PreguntasFrecuentes>Preguntas frecuentes</PreguntasFrecuentes>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 5px;
`;

const PreguntasFrecuentes = styled.span`
  font-family: Roboto;
  color: rgba(255,255,255,1);
  font-size: 14px;
  font-weight: 500;
`;

export default PreguntasButton;
