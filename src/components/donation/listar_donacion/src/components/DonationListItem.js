import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'; // Importa useHistory
import Swal from 'sweetalert2';
import { useAuth } from "../../../../../AuthContext";

const DonationCardContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Image = styled.img`
  max-width: 200px;
  margin-bottom: 10px;
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

const DonationListItem = ({ donation }) => {
  const [expanded, setExpanded] = useState(true);
  const history = useHistory(); // Obtén la función history
  const { isAuthenticated } = useAuth();

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleAction = () => {
    if (isAuthenticated) {
      if (donation.type === 1) {
        // Si el tipo es 1 (Solicitud), redirige a la página de donación
        history.push(`/donardonacion/${donation.don_id}`);
      } else {
        // En otros casos, maneja la acción de solicitud
        console.log('Solicitar:', donation.don_name);
        console.log('id', donation.don_id);
        history.push(`/solicitardonacion/${donation.don_id}`);
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
    console.log('Ubicación:', donation.don_name);
  };

  return (
    <DonationCardContainer>
      <HeaderContainer>
        <Title>{donation.don_name}</Title>
      </HeaderContainer>
      {donation.don_attachment && <Image src={donation.don_attachment} alt="Donacion" />}
      <Description>{donation.don_description}</Description>
      <div>
        <label style={{ textAlign: "left" }}>Estado:</label>
        <span style={{ textAlign: "left" }}>{stateMap[donation.state]}</span>
      </div>
      <ActionButtons>
        <ActionButton onClick={handleAction}>
          <IconContainer>
            <FaUser />
          </IconContainer>
          {donation.type === 1 ? "Donar" : "Solicitar"}
        </ActionButton>
        <ActionButton onClick={handleUbicacion}>
          <IconContainer>
            <FaMapMarkerAlt />
          </IconContainer>
          Ubicación
        </ActionButton>
      </ActionButtons>
    </DonationCardContainer>
  );
};

export default DonationListItem;
