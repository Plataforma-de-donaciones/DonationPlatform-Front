import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MenuComponent from '../../list_users/components/MenuComponent';
import ListadoAdministradores from '../components/ListadoAdministradores';

const ListAdministrators = () => {
  return (
    
    <Container fluid>
      <Row>
        <Col xs={3}>
          <MenuComponent />
        </Col>
        <Col xs={15}>
          <ListadoAdministradores />
        </Col>
      </Row>
    </Container>
    
  );
};

export default ListAdministrators;
