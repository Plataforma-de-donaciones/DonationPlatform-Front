import React from "react";
import SolicitudDonBox from "../components/SolicitudDonBox";
import Layout from "../../../../generales/src/components/layout/Layout";


const DonarDonacion = () => {
  return (

    <Layout haveMenu={false}>
      <SolicitudDonBox />
    </Layout>
  );
};

export default DonarDonacion;
