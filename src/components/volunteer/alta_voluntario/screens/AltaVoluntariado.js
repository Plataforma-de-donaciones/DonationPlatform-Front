import React from "react";
import GeneralHeader from "../../../generales/src/components/GeneralHeader";
import GeneralFooter from "../../../generales/src/components/GeneralFooter";
import Menu from "../../../generales/src/components/Menu";
import VoluntariadoBox from "../components/VoluntariadoBox";
import styled from "styled-components"; // Importa styled-components
import Layout from "../../../generales/src/components/layout/Layout";

const Content = styled.div`
  grid-row: 3; /* Coloca el contenido en la segunda fila */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* Fondo semi-transparente para el contenido */
  position: relative; /* Agrega esta propiedad */
`;

const Footer = styled(GeneralFooter)`
  grid-row: 4; /* Coloca el footer en la tercera fila */
`;

function AltaVoluntariado(props) {
  return (
    <Layout>
        <VoluntariadoBox />
    </Layout>
  );
}

export default AltaVoluntariado;
