import React from "react";
import Layout from "./../../../../generales/src/components/layout/Layout";
import EditarNewBox from "../components/EditarNewBox";

function EditarNoticia(props) {
  return (
    <Layout isFluid sidebar>
      <EditarNewBox />
    </Layout>
  );
}

export default EditarNoticia;
