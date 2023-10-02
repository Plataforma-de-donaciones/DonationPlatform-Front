import React from "react";
import styled from "styled-components";
import NombrePerfilBox from "./NombrePerfilBox";
import CorreoPerfilBox from "./CorreoPerfilBox";
import PerfilContrasenaBox from "./PerfilContrasenaBox";
import ContrasenaNuevaPerfilBox from "./ContrasenaNuevaPerfilBox";
import OrganizacionPerfilBox from "./OrganizacionPerfilBox";
import AceptarButton from "./AceptarButton";
import CancelarButton from "./CancelarButton";
import EliminarCuentaButton from "./EliminarCuentaButton";

function PerfilBox(props) {
  return (
    <Container {...props}>
      <Rect>
        <PerfilText>Perfil</PerfilText>
      </Rect>
      <NombrePerfilBoxStack>
        <NombrePerfilBox></NombrePerfilBox>
        <CorreoPerfilBox></CorreoPerfilBox>
      </NombrePerfilBoxStack>
      <PerfilContrasenaBox></PerfilContrasenaBox>
      <ContrasenaNuevaPerfilBox></ContrasenaNuevaPerfilBox>
      <OrganizacionPerfilBox></OrganizacionPerfilBox>
      <AceptarButtonRow>
        <AceptarButton></AceptarButton>
        <CancelarButton></CancelarButton>
      </AceptarButtonRow>
      <PreguntaEliminarText>¿Desea eliminar su cuenta?</PreguntaEliminarText>
      <EliminarCuentaButton></EliminarCuentaButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 1);
  flex-direction: column;
  padding: 20px; /* Agregado para dar espacio alrededor del contenido */
`;

const Rect = styled.div`
  width: 100%;
  height: 35px;
  background-color: rgba(255, 152, 0, 0.6);
  flex-direction: column;
  display: flex;
  margin-top: 15px;
  box-shadow: 0px 3px 5px 0.35px rgba(0, 0, 0, 1);
`;

const PerfilText = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  text-align: center; /* Centrar el texto */
  margin-top: 6px;
`;

const NombrePerfilBoxStack = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const AceptarButtonRow = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: 20px;
`;

const PreguntaEliminarText = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  text-align: center; /* Centrar el texto */
  margin-top: 30px;
`;

export default PerfilBox;
