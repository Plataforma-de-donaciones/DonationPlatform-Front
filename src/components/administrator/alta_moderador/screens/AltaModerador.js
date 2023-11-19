import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MenuComponent from '../components/MenuComponent';
import ListadoUsuarios from '../components/ListadoUsuarios';

const AltaModerador = () => {
  return (
    
    <Container fluid>
      <Row>
        <Col xs={3}>
          <MenuComponent />
        </Col>
        <Col xs={15}>
          <ListadoUsuarios />
        </Col>
      </Row>
    </Container>
    
  );
};

export default AltaModerador;
