import React, { Component } from "react";
import styled, { css } from "styled-components";
import UntitledComponent from "../components/UntitledComponent";
import HomeHeader from "../components/HomeHeader";
import MaterialCardWithoutImage from "../components/MaterialCardWithoutImage";
import MaterialHeader11 from "../components/MaterialHeader11";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";
import MaterialUnderlineTextbox from "../components/MaterialUnderlineTextbox";
import MaterialButtonDanger from "../components/MaterialButtonDanger";
import MaterialIconButtonsFooter from "../components/MaterialIconButtonsFooter";

function Login(props) {
  return (
    <Group>
      <UntitledComponentStack>
        <UntitledComponent
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 957,
            width: 1949
          }}
        ></UntitledComponent>
        <HomeHeader
          style={{
            height: 87,
            width: 1366,
            position: "absolute",
            top: 43,
            left: 260
          }}
        ></HomeHeader>
        <MaterialCardWithoutImage
          style={{
            height: 358,
            width: 400,
            position: "absolute",
            left: 743,
            top: 235
          }}
        ></MaterialCardWithoutImage>
        <MaterialHeader11
          style={{
            height: 56,
            width: 400,
            position: "absolute",
            left: 743,
            top: 235
          }}
        ></MaterialHeader11>
        <MaterialRightIconTextbox
          style={{
            height: 43,
            width: 304,
            position: "absolute",
            left: 822,
            top: 392
          }}
        ></MaterialRightIconTextbox>
        <MaterialUnderlineTextbox
          style={{
            height: 43,
            width: 299,
            position: "absolute",
            left: 822,
            top: 333
          }}
        ></MaterialUnderlineTextbox>
        <MaterialButtonDanger
          style={{
            height: 36,
            width: 100,
            position: "absolute",
            left: 891,
            top: 530
          }}
        ></MaterialButtonDanger>
        <LoremIpsum>Con usuario y contraseña</LoremIpsum>
        <LoremIpsum2>No tienes cuenta aún, Regístrate!</LoremIpsum2>
        <Image2 src={require("../assets/images/descarga_(9).png")}></Image2>
        <Image3
          src={require("../assets/images/facebook-logo-5-1.png")}
        ></Image3>
        <Image4
          src={require("../assets/images/585e4beacb11b227491c3399.png")}
        ></Image4>
        <Image5
          src={require("../assets/images/207-2073115_font-password-comments-password-icon-png-transparent.png")}
        ></Image5>
        <MaterialIconButtonsFooter
          style={{
            height: 61,
            width: 1366,
            position: "absolute",
            left: 261,
            top: 750
          }}
        ></MaterialIconButtonsFooter>
        <AcercaDe>Acerca de</AcercaDe>
        <AcercaDe1>Términos y condiciones</AcercaDe1>
        <PreguntasFrecuentes>Preguntas frecuentes</PreguntasFrecuentes>
        <Contacto>Contacto</Contacto>
      </UntitledComponentStack>
    </Group>
  );
}

const Group = styled.div`
  display: flex;
  width: 1949px;
  height: 957px;
  flex-direction: column;
  margin-top: -43px;
  margin-left: -260px;
`;

const LoremIpsum = styled.span`
  font-family: Roboto;
  top: 316px;
  left: 864px;
  position: absolute;
  font-style: normal;
  font-weight: 700;
  color: #121212;
`;

const LoremIpsum2 = styled.span`
  font-family: Roboto;
  top: 452px;
  left: 852px;
  position: absolute;
  font-style: normal;
  font-weight: 700;
  color: #121212;
`;

const Image2 = styled.img`
  top: 478px;
  left: 893px;
  width: 41px;
  height: 38px;
  position: absolute;
  object-fit: contain;
`;

const Image3 = styled.img`
  top: 478px;
  left: 949px;
  width: 41px;
  height: 38px;
  position: absolute;
  object-fit: contain;
`;

const Image4 = styled.img`
  top: 349px;
  left: 769px;
  width: 37px;
  height: 26px;
  position: absolute;
  object-fit: contain;
`;

const Image5 = styled.img`
  top: 408px;
  left: 749px;
  width: 76px;
  height: 26px;
  position: absolute;
  object-fit: contain;
`;

const AcercaDe = styled.span`
  font-family: Roboto;
  top: 772px;
  left: 575px;
  position: absolute;
  font-style: normal;
  font-weight: 700;
  color: #121212;
`;

const AcercaDe1 = styled.span`
  font-family: Roboto;
  top: 772px;
  left: 731px;
  position: absolute;
  font-style: normal;
  font-weight: 700;
  color: #121212;
`;

const PreguntasFrecuentes = styled.span`
  font-family: Roboto;
  top: 772px;
  left: 969px;
  position: absolute;
  font-style: normal;
  font-weight: 700;
  color: #121212;
`;

const Contacto = styled.span`
  font-family: Roboto;
  top: 772px;
  left: 1201px;
  position: absolute;
  font-style: normal;
  font-weight: 700;
  color: #121212;
`;

const UntitledComponentStack = styled.div`
  width: 1949px;
  height: 957px;
  position: relative;
`;

export default Login;
