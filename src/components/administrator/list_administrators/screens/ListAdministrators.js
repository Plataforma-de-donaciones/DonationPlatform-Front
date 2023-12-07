import React from "react";
import ListadoAdministradores from "../components/ListadoAdministradores";
import Layout from "../../../generales/src/components/layout/Layout";

const ListAdministrators = () => {
  return (
    <Layout sidebar isFluid>
      <ListadoAdministradores />
    </Layout>
  );
};

export default ListAdministrators;
