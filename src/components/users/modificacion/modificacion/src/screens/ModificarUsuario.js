import React from "react";
import PerfilBox from "../components/PerfilBox";
import Layout from "../../../../../generales/src/components/layout/Layout";
import { Row, Col, Card } from "react-bootstrap";


function ModificarUsuario(props) {
  return (
    <Layout haveMenu={false}>
      <Row>
        <Col className="col-12">
          <Card className='mt-5'>
            <PerfilBox />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default ModificarUsuario;
