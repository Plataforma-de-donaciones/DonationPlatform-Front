import React from "react";
import styled from "styled-components";
import { FaFacebook } from "react-icons/fa";

const Container = styled.button`
  display: flex;
  align-items: center;
  background-color: #007ef1;
  color: #fff;
  border: none;
  border-radius: 53px;
  padding: 8px 16px; /* Ajusta el tamaño aquí */
  cursor: pointer;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.35); /* Agrega sombra aquí */
  transition: background-color 0.3s ease;

  width: 230px;

  &:hover {
    background-color: #005bbf;
  }
`;

const FacebookIcon = styled(FaFacebook)`
  font-size: 20px; /* Ajusta el tamaño del icono aquí */
  margin-right: 10px;
`;

const Caption = styled.span`
  font-size: 14px;
  white-space: nowrap; /* Evita el desbordamiento de texto en pantallas pequeñas */
  overflow: hidden; /* Oculta el texto que no cabe */
  text-overflow: ellipsis; /* Agrega puntos suspensivos si el texto es demasiado largo */
`;

function FbRegistroButton(props) {
  return (
    <Container>
      <FacebookIcon />
      <Caption>Regístrate con Facebook</Caption>
    </Container>
  );
}

export default FbRegistroButton;
