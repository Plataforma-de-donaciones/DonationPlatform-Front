import React, { useState } from "react";
import ListadoPaginado from "../components/ListadoPaginado";
import Layout from "../../../../generales/src/components/layout/Layout";
import { Col, Row } from "react-bootstrap";

//url:listadosolicitudes
function ListarSolicitudesPropios(props) {
  const [tipo, setTipo] = useState("donations");

  return (
    <>
      <Layout>
        <Row>
          <Col className="col-12">
            <ListadoPaginado tipo={tipo} />
          </Col>
        </Row>
      </Layout>
    </>
  );
}

export default ListarSolicitudesPropios;
