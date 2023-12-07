import React from "react";
import ListadoModeradores from "../components/ListadoModeradores";
import Layout from "../../../generales/src/components/layout/Layout";

const ListModerators = () => {
  return (
    <Layout sidebar isFluid>
      <ListadoModeradores />
    </Layout>
  );
};

export default ListModerators;
