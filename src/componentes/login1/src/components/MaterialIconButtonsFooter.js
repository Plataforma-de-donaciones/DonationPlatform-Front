import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialIconButtonsFooter(props) {
  return <Container {...props}></Container>;
}

const Container = styled.div`
  display: flex;
  background-color: rgba(255,152,0,1);
  flex-direction: row;
  align-items: center;
  box-shadow: 0px -2px 1.2px  0.2px #111 ;
`;

export default MaterialIconButtonsFooter;
