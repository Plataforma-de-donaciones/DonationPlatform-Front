import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MenuComponent from '../../list_users/components/MenuComponent';
import ListadoNoticias from '../components/ListadoNoticias';
// import GeneralFooter from '../../../generales/src/components/GeneralFooter';
// import GeneralHeader from '../../../generales/src/components/GeneralHeader';

const ListNewsMod = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <MenuComponent />
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="mt-4">
          <ListadoNoticias />
        </Col>
      </Row>
    </Container>
  );
};

export default ListNewsMod;


