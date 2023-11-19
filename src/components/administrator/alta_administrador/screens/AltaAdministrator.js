import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MenuComponent from '../components/MenuComponent';
import ListadoUsuariosAdm from '../components/ListadoUsuariosAdm';

const AltaAdministrador = () => {
  return (
    
    <Container fluid>
      <Row>
        <Col xs={3}>
          <MenuComponent />
        </Col>
        <Col xs={15}>
          <ListadoUsuariosAdm />
        </Col>
      </Row>
    </Container>
    
  );
};

export default AltaAdministrador;
