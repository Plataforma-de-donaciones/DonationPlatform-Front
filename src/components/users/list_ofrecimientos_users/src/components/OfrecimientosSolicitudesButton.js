import React, { Component } from "react";
import styled, { css } from "styled-components";

function OfrecimientosSolicitudesButton(props) {
  return (
    <Container {...props}>
      <Solicitudes>Solicitudes</Solicitudes>
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
  box-shadow: 0px 1px 5px  0.35px rgba(0,0,0,1) ;
`;

const Solicitudes = styled.span`
  font-family: Roboto;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

export default OfrecimientosSolicitudesButton;
