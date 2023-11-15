import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import CardItem from '../../../../generales/src/components/CardItem';
import { Button, Card, Col, Row } from 'react-bootstrap';

const EventCardContainer = styled.div`
  display: flex;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Description = styled.p`
  display: block;
`;

const ExpandButton = styled.button`
  margin-top: 8px;
  align-self: flex-end;
`;

const ImageContainer = styled.div`
flex: 1;
padding-right: 16px;
`;

const Image = styled.img`
  max-width: 200px;
  margin-bottom: 10px;
`;

const TextContainer = styled.div`
flex: 1;
display: flex;
flex-direction: column;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: rgba(255, 152, 0, 1);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 8px;
`;

const IconContainer = styled.span`
  margin-right: 8px;
`;

const stateMap = {
  1: "Publicado",
  2: "Solicitado",
  3: "Finalizado",
};

const EventListItem = ({ evento }) => {
  const [expanded, setExpanded] = useState(true);
  const history = useHistory();

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleUbicacion = () => {
    console.log('Ubicación:', evento.event_name);
  };

  return (
    <>
      <Card className='mb-3'>

        <Card.Title className='text-center mt-3 card-titulo'>{evento.event_name}</Card.Title>
        <span className='text-center'>{evento.event_description}</span>
        <Card.Body>

          <Row className='text-center'>
            <Col>
              {evento.attachments && <Image src={evento.attachments} alt="Evento" />}
            </Col>
          </Row>

          <Row className='text-center'>
            <Col>
              <div>
                <label className="font-weight-bold">Fecha de Inicio:</label>
                <span style={{ textAlign: "left" }}> {evento.formattedDateTime.formattedDate}</span>
              </div>
              <div>
                <label style={{ textAlign: "left" }}>Hora de Inicio:</label>
                <span style={{ textAlign: "left" }}> {evento.formattedDateTime.formattedTime}</span>
              </div>
            </Col>

            <Col className='align-middle'>
              <div>
                <label className="align-middle">Fecha de Finalización:</label>
                <span className='align-middle'> {evento.formattedEndDate.formattedDate}</span>
              </div>
              <div>
                <label style={{ textAlign: "left" }}>Hora de Finalización:</label>
                <span style={{ textAlign: "left" }}> {evento.formattedEndDate.formattedTime}</span>
              </div>
            </Col>
          </Row>

        </Card.Body>
        <Card.Footer>
          <div className='text-center mb-3'>
            <label style={{ textAlign: "left" }}>Estado:</label>
            <span style={{ textAlign: "left" }}>{stateMap[evento.state]}</span>
          </div>
          <ActionButtons className='text-center mx-auto mb-2'>
            <Button onClick={handleUbicacion}>
              <IconContainer>
                <FaMapMarkerAlt />
              </IconContainer>
              Ubicación
            </Button>
          </ActionButtons>
         
        </Card.Footer>
      </Card >

    
    </>
  );
};

export default EventListItem;
