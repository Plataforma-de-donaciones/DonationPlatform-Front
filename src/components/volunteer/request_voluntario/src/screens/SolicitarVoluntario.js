import React from "react";
import SolicitudVolBox from "../components/SolicitudVolBox";
import Layout from "../../../../generales/src/components/layout/Layout";

const SolicitarVoluntario = () => {
  return (
    <Layout haveMenu={false}>
      <SolicitudVolBox />
    </Layout>
  );
};

export default SolicitarVoluntario;
