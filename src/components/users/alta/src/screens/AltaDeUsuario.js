import React from "react";
import GeneralHeader from "../../../../generales/src/components/GeneralHeader";
import FormularioBox from "../components/FormularioBox";
import GeneralFooter from "../../../../generales/src/components/GeneralFooter";
import styled from "styled-components"; // Importa styled-components

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto; /* Configura las filas según tus necesidades */
  min-height: 100vh; /* Altura mínima de la ventana del navegador */
  width: 100%; /* Ancho completo de la ventana del navegador */
`;

const Header = styled(GeneralHeader)`
  grid-row: 1; /* Coloca el header en la primera fila */
`;

const Content = styled.div`
  grid-row: 2; /* Coloca el contenido en la segunda fila */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* Fondo semi-transparente para el contenido */
  position: relative; /* Agrega esta propiedad */
`;

const Footer = styled(GeneralFooter)`
  grid-row: 3; /* Coloca el footer en la tercera fila */
`;

function AltaDeUsuario(props) {
  return (
    <Container>
      <Header />
      <Content>
        <FormularioBox />
      </Content>
      <Footer />
    </Container>
  );
}

export default AltaDeUsuario;
