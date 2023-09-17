import React, { Component } from "react";
import styled, { css } from "styled-components";
//import MaterialCommunityIconsIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";
//import IoniconsIcon from "react-native-vector-icons/dist/Ionicons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faBars, faUser } from "@fortawesome/free-solid-svg-icons"; // Importa los íconos que necesitas


function HomeHeader(props) {
  return (
    <Container {...props}>
      <Rect></Rect>
      <LeftIconButtonRowRow>
        <LeftIconButtonRow>
          <LeftIconButton>
            <ButtonOverlay>
            <FontAwesomeIcon
                icon={faBars} // Utiliza el ícono FontAwesome que desees
                style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                fontSize: 24
                }}
              />
            </ButtonOverlay>
          </LeftIconButton>
          <Isotype src={require("../assets/images/logowhite1.png")}></Isotype>
          <Logo>
            <DonacionesUy numberOfLines={1}>Donaciones.uy</DonacionesUy>
          </Logo>
        </LeftIconButtonRow>
        <LeftIconButtonRowFiller></LeftIconButtonRowFiller>
        <RightIconButton>
          <ButtonOverlay>
          <FontAwesomeIcon
              icon={faUser} // Utiliza el ícono FontAwesome que desees
              style={{
              backgroundColor: "transparent",
              color: "#FFFFFF",
              fontSize: 24
              }}
            />
          </ButtonOverlay>
        </RightIconButton>
      </LeftIconButtonRowRow>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(255,152,0,1);
  flex-direction: row;
  align-items: center;
  padding: 4px;
  justify-content: space-between;
  box-shadow: 0px 2px 1.2px  0.2px #111 ;
`;

const ButtonOverlay = styled.button`
 display: block;
 background: none;
 height: 100%;
 width: 100%;
 border:none
 `;
const Rect = styled.div`
  width: 87px;
  height: 75px;
  background-color: #E6E6E6;
  margin-left: 768px;
  margin-top: 333px;
`;

const LeftIconButton = styled.div`
  padding: 11px;
  flex-direction: column;
  display: flex;
  margin-top: 20px;
  border: none;
`;

const Isotype = styled.img`
  width: 100%;
  height: 87px;
  margin-left: 523px;
  object-fit: contain;
`;

const Logo = styled.div`
  width: 186px;
  height: 40px;
  overflow: visible;
  flex-direction: column;
  margin-left: 4px;
  margin-top: 40px;
  display: flex;
`;

const DonacionesUy = styled.span`
  font-family: Gloria Hallelujah;
  font-size: 30px;
  color: #FFFFFF;
  background-color: transparent;
  line-height: 28px;
  font-weight: 400;
  margin: 0px;
  text-align: center;
  align-self: flex-start;
  width: 185px;
  height: 40px;
`;

const LeftIconButtonRow = styled.div`
  height: 87px;
  flex-direction: row;
  display: flex;
`;

const LeftIconButtonRowFiller = styled.div`
  flex: 1 1 0%;
  flex-direction: row;
  display: flex;
`;

const RightIconButton = styled.div`
  padding: 11px;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
  display: flex;
  margin-top: 33px;
  border: none;
`;

const LeftIconButtonRowRow = styled.div`
  height: 87px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-left: -855px;
`;

export default HomeHeader;
