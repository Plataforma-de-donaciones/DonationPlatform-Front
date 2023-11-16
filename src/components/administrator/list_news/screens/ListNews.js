import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MenuComponent from '../../list_users/components/MenuComponent';
import ListadoNoticias from '../components/ListadoNoticias';
//import GeneralFooter from '../../../generales/src/components/GeneralFooter';
//import GeneralHeader from '../../../generales/src/components/GeneralHeader';

const ListNews = () => {
  return (
    
    <Container fluid>
      <Row>
        <Col xs={3}>
          <MenuComponent />
        </Col>
        <Col xs={9}>
          <ListadoNoticias />
        </Col>
      </Row>
    </Container>
    
  );
};

export default ListNews;
