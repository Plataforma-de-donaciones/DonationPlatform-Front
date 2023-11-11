import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialButtonWithShadow(props) {
  return (
    <Container {...props}>
      <Caption>términos y condiciones.</Caption>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
`;

const Caption = styled.span`
  color: rgba(255,152,0,1);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
`;

export default MaterialButtonWithShadow;
