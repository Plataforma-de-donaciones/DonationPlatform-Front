import React from "react";
import styled from "styled-components";
import { FaGoogle } from "react-icons/fa";

const Container = styled.button`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(0, 0, 0, 1);
  border: none;
  border-radius: 100px;
  padding: 8px 16px; /* Ajusta el tamaño aquí */
  cursor: pointer;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.35); /* Agrega sombra aquí */
  transition: background-color 0.3s ease;

  width: 230px;

  &:hover {
    background-color: rgba(230, 230, 230, 1);
  }
`;

const GoogleIcon = styled(FaGoogle)`
  font-size: 20px; /* Ajusta el tamaño del icono aquí */
  margin-right: 10px;
`;

const Caption = styled.span`
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function GoogleRegistroButton(props) {
  return (
    <Container>
      <GoogleIcon />
      <Caption>Regístrate con Google</Caption>
    </Container>
  );
}

export default GoogleRegistroButton;
