import React from "react";
import EditarDonBox from "../components/EditarDonBox";
import Layout from "./../../../../generales/src/components/layout/Layout";

//url:editardonacion/id
function EditarDonacion(props) {
  return (
    <>
      <Layout>
          <EditarDonBox />
      </Layout>
    </>
  );
}

export default EditarDonacion;
