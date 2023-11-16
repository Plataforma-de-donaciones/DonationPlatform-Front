import React from "react";
import SolicitudEqMedicoBox from "../components/SolicitudEqMedicoBox";
import Layout from "../../../../generales/src/components/layout/Layout";


const SolicitarEquipamiento = () => {
  return (

    <Layout haveMenu={false}>
      <SolicitudEqMedicoBox />
    </Layout>
  );
};

export default SolicitarEquipamiento;
