import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons"; // Importa el ícono de usuario

function GeneralHeader(props) {
  return (
    <Container {...props}>
      <MenuIcon>
        <ButtonOverlay onClick={props.onMenuClick}>
          <FontAwesomeIcon
            icon={faBars}
            style={{
              backgroundColor: "transparent",
              color: "#FFFFFF",
              fontSize: "24px",
            }}
          />
        </ButtonOverlay>
      </MenuIcon>
      <LogoContainer>
        <Isotype src={require("../assets/images/logowhite1.png")} alt="Logo" />
        <LogoText>Donaciones.uy</LogoText>
      </LogoContainer>
      <UserIcon>
        <ButtonOverlay>
          <FontAwesomeIcon
            icon={faUser}
            style={{
              backgroundColor: "transparent",
              color: "#FFFFFF",
              fontSize: "24px",
            }}
          />
        </ButtonOverlay>
      </UserIcon>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(255, 152, 0, 1);
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ButtonOverlay = styled.button`
  display: block;
  background: none;
  height: 100%;
  width: 100%;
  border: none;
  cursor: pointer;
`;

const MenuIcon = styled.div`
  padding: 0.5rem;
  width: 2.5rem;
  border: none;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Isotype = styled.img`
  width: 80px;
  height: auto;
  object-fit: contain;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const LogoText = styled.span`
  font-family: Gloria Hallelujah;
  font-size: 2rem;
  color: #FFFFFF;
  background-color: transparent;
  font-weight: 400;
  text-align: center;

  @media (max-width: 768px) {
    margin-left: 0;
    font-size: 1.2rem;
  }
`;

const UserIcon = styled.div`
  padding: 0.5rem;
  width: 2.5rem;
  border: none;
`;

export default GeneralHeader;
