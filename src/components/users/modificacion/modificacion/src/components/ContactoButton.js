import React, { Component } from "react";
import styled, { css } from "styled-components";

function ContactoButton(props) {
  return (
    <Container {...props}>
      <Contacto>Contacto</Contacto>
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

const Contacto = styled.span`
  font-family: Roboto;
  color: rgba(255,255,255,1);
  font-size: 14px;
  font-weight: 500;
`;

export default ContactoButton;
