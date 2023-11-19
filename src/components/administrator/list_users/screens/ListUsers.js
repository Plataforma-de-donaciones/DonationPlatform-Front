import React from "react";
import ListadoUsuarios from "../components/ListadoUsuarios";
import Layout from "./../../../generales/src/components/layout/Layout";

const ListUsers = () => {
  return (
    <Layout sidebar >
      <ListadoUsuarios />
    </Layout>
  );
};

export default ListUsers;
