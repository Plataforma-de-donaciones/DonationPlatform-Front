import React, { useState } from 'react';
import Axios from 'axios';
import styled from "styled-components";
import GeneralHeader from '../../../../generales/src/components/GeneralHeader';
import LoginBox from "../components/LoginBox";
import GeneralFooter from "../components/GeneralFooter";
import BackgroundLogin from "../components/BackgroundLogin"; // Importa BackgroundLogin

const Container = styled.div`
  display: grid;
  grid-template-rows: 87px 1fr 60px; /* Configura las filas según tus necesidades */
  min-height: 100vh; /* Altura mínima de la ventana del navegador */
  width: 100%; /* Ancho completo de la ventana del navegador */
  /* background-image: url("../assets/images/volunteer-4955973_1280.jpg"); Elimina esto */
  background-size: cover; /* Ajusta el tamaño de la imagen para cubrir todo el contenedor */
  background-repeat: no-repeat; /* Evita la repetición de la imagen de fondo */
  background-position: center; /* Centra la imagen de fondo */
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

const Login = () => {
  return (
    <Container>
      <BackgroundLogin /> {/* Coloca BackgroundLogin antes que los otros componentes */}
      <Header />
      <Content>
        <LoginBox />
      </Content>
      <Footer />
    </Container>
  );
};

export default Login;
