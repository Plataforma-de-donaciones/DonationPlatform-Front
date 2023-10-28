import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'; // Importa useHistory

const EquipamientoMedicoCardContainer = styled.div`
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

const EquipamientoMedicoListItem = ({ equipamiento }) => {
  const [expanded, setExpanded] = useState(true);
  const history = useHistory(); // Obtén la función history

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSolicitar = () => {
    // Lógica para manejar la acción de solicitar
    console.log('Solicitar:', equipamiento.eq_name);
    console.log('id', equipamiento.eq_id);
    history.push(`/solicitarequipamiento/${equipamiento.eq_id}`);
  };

  const handleUbicacion = () => {
    // Lógica para manejar la acción de ubicación
    console.log('Ubicación:', equipamiento.eq_name);
  };

  return (
    <EquipamientoMedicoCardContainer>
      <HeaderContainer>
        <Title>{equipamiento.eq_name}</Title>
      </HeaderContainer>
      {equipamiento.eq_attachment && <Image src={equipamiento.eq_attachment} alt="Equipamiento" />}
      <Description>{equipamiento.eq_description}</Description>
      <div>
          <label style={{ textAlign: "left" }}>Estado:</label>
          <span>{stateMap[equipamiento.state]}</span>
        </div>
      <ActionButtons>
        <ActionButton onClick={handleSolicitar}>
          <IconContainer>
            <FaUser />
          </IconContainer>
          Solicitar
        </ActionButton>
        <ActionButton onClick={handleUbicacion}>
          <IconContainer>
            <FaMapMarkerAlt />
          </IconContainer>
          Ubicación
        </ActionButton>
      </ActionButtons>
    </EquipamientoMedicoCardContainer>
  );
};

export default EquipamientoMedicoListItem;
