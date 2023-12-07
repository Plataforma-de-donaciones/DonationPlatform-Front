import React from "react";
import EquipamientoMedicoBox from "../components/EquipamientoMedicoBox";
import Layout from "../../../generales/src/components/layout/Layout";
import { Row, Col, CardBody } from "react-bootstrap";

function AltaEquipamiento(props) {
  return (
    <Layout>
      <Row>
        <Col>
          <CardBody>
            <EquipamientoMedicoBox />
          </CardBody>
        </Col>
      </Row>
    </Layout>
  );
}

export default AltaEquipamiento;
