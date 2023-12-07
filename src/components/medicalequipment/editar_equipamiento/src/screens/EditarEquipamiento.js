import React from "react";
import EditarEqMedicoBox from "../components/EditarEqMedicoBox";
import Layout from "../../../../generales/src/components/layout/Layout";
import { Row, Col, CardBody } from "react-bootstrap";


function EditarEquipamiento(props) {
  return (
    <Layout>
      <Row>
        <Col>
          <CardBody>
            <EditarEqMedicoBox />
          </CardBody>
        </Col>
      </Row>
    </Layout>
  );
}

export default EditarEquipamiento;
