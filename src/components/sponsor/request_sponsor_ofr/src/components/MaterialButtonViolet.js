import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialButtonViolet(props) {
  return (
    <Container {...props}>
      <Enviar>Enviar</Enviar>
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
min-width: 88px;
padding-left: 16px;
padding-right: 16px;
box-shadow: 0px 1px 5px  0.35px #000 ;
cursor: pointer;
&:hover {
  background-color: rgba(255, 152, 0, 0.8);
}

&:active {
  background-color: rgba(155, 155, 155, 0.6);
}
`;

const Enviar = styled.span`
color: #fff;
font-size: 14px;
font-style: normal;
font-weight: 700;
`;

export default MaterialButtonViolet;
