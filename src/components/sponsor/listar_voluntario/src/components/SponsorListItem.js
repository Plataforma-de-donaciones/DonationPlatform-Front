import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../../../../AuthContext";

const SponsorCardContainer = styled.div`
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

const SponsorListItem = ({ sponsor }) => {
  const [expanded, setExpanded] = useState(true);
  const history = useHistory();
  const { isAuthenticated } = useAuth();

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleAction = () => {
    if(isAuthenticated) {
      if (sponsor.type === 1) {
        history.push(`/donarpadrino/${sponsor.sponsor_id}`);
      } else {
        console.log('Solicitar:', sponsor.sponsor_name);
        console.log('id', sponsor.sponsor_id);
        history.push(`/solicitarpadrino/${sponsor.sponsor_id}`);
      }
    } else {
      alert("Debes iniciar sesión para completar esta acción.");
  }
  };
  

  const handleUbicacion = () => {
    // Lógica para manejar la acción de ubicación
    console.log('Ubicación:', sponsor.sponsor_name);
  };

  return (
    <SponsorCardContainer>
      <HeaderContainer>
        <Title>{sponsor.sponsor_name}</Title>
      </HeaderContainer>
      <Description>{sponsor.sponsor_description}</Description>
      <div>
          <label style={{ textAlign: "left" }}>Estado:</label>
          <span style={{ textAlign: "left" }}>{stateMap[sponsor.state]}</span>
        </div>
      <ActionButtons>
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
    </SponsorCardContainer>
  );
};

export default SponsorListItem;
