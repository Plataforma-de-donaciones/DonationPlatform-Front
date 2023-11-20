import React from "react";
import Layout from "./../../../../generales/src/components/layout/Layout";
import EditarNewBoxMod from "../components/EditarNewBoxMod";

function EditarNoticiaMod(props) {
  return (
    <Layout isModerator sidebar isFluid>
      <EditarNewBoxMod />
    </Layout>
  );
}

export default EditarNoticiaMod;