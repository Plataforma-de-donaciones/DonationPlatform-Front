import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function HomeHeader(props) {
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
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(255, 152, 0, 1);
  align-items: center;
  justify-content: space-between; /* Centra horizontalmente los elementos */
  padding: 1rem;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column; /* Cambia a una dirección de columna en pantallas más pequeñas */
    align-items: center;
  }
`;

const ButtonOverlay = styled.button`
  display: block;
  background: none;
  height: 100%;
  width: 100%;
  border: none;
  cursor: pointer; /* Cambia el cursor al pasar el mouse */
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
  width: 80px; /* Ancho fijo en píxeles */
  height: auto;
  object-fit: contain;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem; /* Agrega espacio entre el logo y el texto en pantallas pequeñas */
  }
`;

const LogoText = styled.span`
  font-family: Gloria Hallelujah;
  font-size: 2rem;
  color: #FFFFFF;
  background-color: transparent;
  font-weight: 400;
  text-align: center; /* Centra el texto horizontalmente */

  @media (max-width: 768px) {
    margin-left: 0;
    font-size: 1.2rem; /* Cambia el tamaño del texto en pantallas pequeñas */
  }
`;

export default HomeHeader;
