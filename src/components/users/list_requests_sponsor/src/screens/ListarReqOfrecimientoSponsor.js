import React, { useState } from "react";
import ListadoSponsors from "../components/ListadoSponsors";
import { useParams } from "react-router-dom";
import Layout from "../../../../generales/src/components/layout/Layout";

//url:listadorequestsponsor/id
function ListarReqOfrecimientoSponsor(props) {
  const { sponsorId } = useParams();

  return (
    <Layout>
      <ListadoSponsors sponsorId={sponsorId} />
    </Layout>
  );
}

export default ListarReqOfrecimientoSponsor;
