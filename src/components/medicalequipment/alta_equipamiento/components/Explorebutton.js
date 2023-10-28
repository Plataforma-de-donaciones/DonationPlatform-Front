import React, { Component } from "react";
import styled, { css } from "styled-components";

function Explorebutton(props) {
  return (
    <Container {...props}>
      <Explore>explore</Explore>
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
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

const Explore = styled.span`
  color: rgba(255,152,0,1);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
`;

export default Explorebutton;
