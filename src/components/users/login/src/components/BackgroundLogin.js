import React from "react";
import styled from "styled-components";

function BackgroundLogin(props) {
  return (
    <Container {...props}>
      <BackgroundImageLogin
        src={require("../assets/images/volunteer-4955973_1280.jpg")}
      />
    </Container>
  );
}

const Container = styled.div`
  opacity: 1;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2; /* Asegura que el fondo esté detrás de otros elementos */
`;

const BackgroundImageLogin = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default BackgroundLogin;
