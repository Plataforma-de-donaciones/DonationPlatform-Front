import React, { Component } from "react";
import styled, { css } from "styled-components";

function TituloLine(props) {
  return <Container {...props}></Container>;
}

const Container = styled.div`
  background-color: rgba(255,152,0,1);
  opacity: 0.5;
`;

export default TituloLine;
