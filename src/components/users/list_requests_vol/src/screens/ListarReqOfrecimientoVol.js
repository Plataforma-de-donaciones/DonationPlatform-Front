import React, { useState } from "react";
import ListadoVoluntarios from "../components/ListadoVoluntarios";
import { useParams } from "react-router-dom";
import Layout from "./../../../../generales/src/components/layout/Layout";

//url:listadorequestvol/id
function ListarReqOfrecimientoVol(props) {
  const { voluntarioId } = useParams();

  return (
    <Layout>
      <ListadoVoluntarios voluntarioId={voluntarioId} />
    </Layout>
  );
}

export default ListarReqOfrecimientoVol;
