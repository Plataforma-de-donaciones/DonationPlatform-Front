import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MenuComponent from '../../list_users/components/MenuComponent';
import CrearNews from '../components/CrearNews';

const CrearNoticia = () => {
  return (
    
    <Container fluid>
      <Row>
        <Col xs={3}>
          <MenuComponent />
        </Col>
        <Col xs={6} style={{ marginTop: '100px' }}>
          <CrearNews />
        </Col>
      </Row>
    </Container>
    
  );
};

export default CrearNoticia;
