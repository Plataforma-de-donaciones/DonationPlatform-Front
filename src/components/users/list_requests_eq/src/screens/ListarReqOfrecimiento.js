import React, { useState } from "react";
import ListadoEquipamiento from "../components/ListadoEquipamiento";
import { useParams } from "react-router-dom";
import Layout from "../../../../generales/src/components/layout/Layout";

//url:listadorequesteq/id
function ListarReqOfrecimiento(props) {
  const { eqId } = useParams();

  return (
    <Layout>
      <ListadoEquipamiento eqId={eqId} />
    </Layout>
  );
}

export default ListarReqOfrecimiento;
