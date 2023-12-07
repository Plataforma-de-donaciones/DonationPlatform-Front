import React, { useState } from "react";
import ListadoDonacion from "../components/ListadoDonacion";
import { useParams } from "react-router-dom";
import Layout from "../../../../generales/src/components/layout/Layout";

function ListarReqOfrecimientoDon(props) {
  const { donId } = useParams();

  return (
    <Layout>
      <ListadoDonacion donId={donId} />
    </Layout>
  );
}

export default ListarReqOfrecimientoDon;
