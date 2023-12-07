import React from "react";
import ListadoNoticias from "../components/ListadoNoticias";
import Layout from "./../../../generales/src/components/layout/Layout";

const ListNews = () => {
  return (
    <Layout isFluid sidebar>
      <ListadoNoticias />
    </Layout>
  );
};

export default ListNews;
