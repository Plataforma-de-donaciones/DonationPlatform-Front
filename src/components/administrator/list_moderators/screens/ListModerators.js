import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MenuComponent from '../../list_users/components/MenuComponent';
import ListadoModeradores from '../components/ListadoModeradores';
//import GeneralFooter from '../../../generales/src/components/GeneralFooter';
//import GeneralHeader from '../../../generales/src/components/GeneralHeader';

const ListModerators = () => {
  return (
    
    <Container fluid>
      <Row>
        <Col xs={3}>
          <MenuComponent />
        </Col>
        <Col xs={15}>
          <ListadoModeradores />
        </Col>
      </Row>
    </Container>
    
  );
};

export default ListModerators;
