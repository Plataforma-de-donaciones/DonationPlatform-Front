import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MenuComponent from '../components/MenuComponent';
import ListadoUsuarios from '../components/ListadoUsuarios';
//import GeneralFooter from '../../../generales/src/components/GeneralFooter';
//import GeneralHeader from '../../../generales/src/components/GeneralHeader';

const ListUsersMod = () => {
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

export default ListUsersMod;
