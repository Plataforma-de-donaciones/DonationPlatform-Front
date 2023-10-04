import React from "react";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #D9D5DC;
  background-color: transparent;
  flex-direction: column;
  position: relative;
  width: 100%; /* Hace que el contenedor ocupe el 100% del ancho disponible */
  max-width: 600px; /* Establece un ancho máximo para mantener la legibilidad */
  margin: 0 auto; /* Centra el contenedor en la página */
`;

const PerfilContraseñaText = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  font-weight: 700;
`;

const PerfilContraseñaBbdd = styled.input`
  color: #000;
  font-size: 14px;
  align-self: stretch;
  flex: 1 1 0%;
  line-height: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #D9D5DC;

`;

const PencilIcon = styled(MdEdit)`
  position: absolute;
  color: rgba(0, 0, 0, 1);
  font-size: 20px;
  right: 16px; /* Ajusta la posición del icono a la derecha */
  top: 50%; /* Centra el icono verticalmente */
  transform: translateY(-50%); /* Ajusta la posición vertical del icono */
`;

function PerfilContrasenaBox(props) {
  return (
    <Container {...props}>
      <PerfilContraseñaText>Contraseña actual</PerfilContraseñaText>
      <PerfilContraseñaBbdd placeholder="Contraseña actual"></PerfilContraseñaBbdd>
      <PencilIcon />
    </Container>
  );
}

export default PerfilContrasenaBox;
