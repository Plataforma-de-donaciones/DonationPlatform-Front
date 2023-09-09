import React, { Component } from "react";
import styled, { css } from "styled-components";

function UntitledComponent(props) {
  return (
    <Container {...props}>
      <Image6
        src={require("../assets/images/volunteer-4955973_1280.jpg")}
      ></Image6>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  opacity: 0.51;
  flex-direction: column;
`;

const Image6 = styled.img`
  width: 1949px;
  height: 100%;
  object-fit: contain;
`;

export default UntitledComponent;
