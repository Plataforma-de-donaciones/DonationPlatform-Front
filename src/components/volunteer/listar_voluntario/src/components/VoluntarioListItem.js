import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../../../../AuthContext";
import Swal from 'sweetalert2';
import { Container, Row, Col } from 'react-bootstrap';
import CardItem from '../../../../generales/src/components/CardItem';

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

const VoluntarioListItem = ({ volunteer }) => {
  const [expanded, setExpanded] = useState(true);
  const history = useHistory();
  const { isAuthenticated } = useAuth();

  const handleAction = () => {
    if (isAuthenticated) {
      if (volunteer.type === 1) {
        history.push(`/donarvoluntariado/${volunteer.vol_id}`);
      } else {
        console.log('Solicitar:', volunteer.vol_name);
        console.log('id', volunteer.vol_id);
        history.push(`/solicitarvoluntariado/${volunteer.vol_id}`);
      }
    } else {
      Swal.fire({
        title: 'Debes iniciar sesión para completar esta acción',
        text: '¿Desea ir al login en este momento?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/login');
        }
      });
    }
  };


  const handleUbicacion = () => {
    // Lógica para manejar la acción de ubicación
    console.log('Ubicación:', volunteer.vol_name);
  };

  return (
    <>
      <Container fluid>
        <Row className='mb-3'>
          <Col >
            <CardItem
              name={volunteer.vol_name}
              state={stateMap[volunteer.state]}
              descriptions={volunteer.vol_description}
              childrens={<ActionButtons>
                <ActionButton onClick={handleAction}>
                  <IconContainer>
                    <FaUser />
                  </IconContainer>
                  {volunteer.type === 1 ? "Donar" : "Solicitar"}
                </ActionButton>
                <ActionButton onClick={handleUbicacion}>
                  <IconContainer>
                    <FaMapMarkerAlt />
                  </IconContainer>
                  Ubicación
                </ActionButton>
              </ActionButtons>}
            />
          </Col>
        </Row>
      </Container>

    </>
  );
};

export default VoluntarioListItem;
