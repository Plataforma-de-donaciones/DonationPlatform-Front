import React, { Component } from "react";
import styled, { css } from "styled-components";

function OfrecimientosComentariosButton(props) {
  return (
    <Container {...props}>
      <Comentarios>Comentarios</Comentarios>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(255,152,0,1);
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 100px;
  padding-left: 16px;
  padding-right: 16px;
`;

const Comentarios = styled.span`
  font-family: Roboto;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

export default OfrecimientosComentariosButton;
