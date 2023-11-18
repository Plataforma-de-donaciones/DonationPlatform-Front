import React from "react";
import FormularioBox from "../components/FormularioBox";
import styled from "styled-components"; // Importa styled-components
import GeneralFooter from "../../../login/src/components/GeneralFooter";
import GeneralHeader from "../../../../generales/src/components/GeneralHeader";
import Layout from './../../../../generales/src/components/layout/Layout';


function AltaDeUsuario(props) {
  return (
    <Layout>
      <FormularioBox />
    </Layout>
  );
}

export default AltaDeUsuario;
