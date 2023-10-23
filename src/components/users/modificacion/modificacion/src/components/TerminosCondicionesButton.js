import React, { Component } from "react";
import styled, { css } from "styled-components";

function TerminosCondicionesButton(props) {
  return (
    <Container {...props}>
      <Caption>Términos y condiciones</Caption>
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

const Caption = styled.span`
  font-family: Roboto;
  color: rgba(255,255,255,1);
  font-size: 14px;
  font-weight: 500;
`;

export default TerminosCondicionesButton;
