import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../../../../AuthContext";
import Swal from 'sweetalert2';
import CardItem from '../../../../generales/src/components/CardItem';
import { Container, Row, Col } from 'react-bootstrap';

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: rgba(79,181,139, 1);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 8px;
`;

const IconContainer = styled.span`
  margin-right: 8px;
  margin-bottom: 3px;

`;

const stateMap = {
  1: "Publicado",
  2: "Solicitado",
  3: "Finalizado",
};

const SponsorListItem = ({ sponsor }) => {
  const history = useHistory();
  const { isAuthenticated } = useAuth();

  const handleAction = () => {
    if (isAuthenticated) {
      if (sponsor.type === 1) {
        history.push(`/donarpadrino/${sponsor.sponsor_id}`);
      } else {
        console.log('Solicitar:', sponsor.sponsor_name);
        console.log('id', sponsor.sponsor_id);
        history.push(`/solicitarpadrino/${sponsor.sponsor_id}`);
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
    console.log('Ubicación:', sponsor.sponsor_name);
  };

  return (
    <>

      <CardItem
        name={sponsor.sponsor_name}
        state={stateMap[sponsor.state]}
        descriptions={sponsor.sponsor_description}
        childrens={

          <ActionButtons className='mb-3'>

            <ActionButton onClick={handleAction}>
              <IconContainer>
                <FaUser />
              </IconContainer>
              {sponsor.type === 1 ? "Donar" : "Solicitar"}
            </ActionButton>
            <ActionButton onClick={handleUbicacion}>
              <IconContainer>
                <FaMapMarkerAlt />
              </IconContainer>
              Ubicación
            </ActionButton>

          </ActionButtons>

        }
      />

    </>

  );
};

export default SponsorListItem;
