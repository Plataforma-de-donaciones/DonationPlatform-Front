import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa'; // Importa íconos de FontAwesome

const EquipamientoMedicoCardContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: 800px; /* Ajusta el ancho de la tarjeta */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra los elementos horizontalmente */
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* Ajusta el ancho al 100% */
  margin-bottom: 8px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Description = styled.p`
  display: block; /* Mostrar siempre la descripción */
`;

const ExpandButton = styled.button`
  margin-top: 8px;
  align-self: flex-end;
`;

const Image = styled.img`
  max-width: 200px; /* Ajusta el ancho máximo según sea necesario */
  margin-bottom: 10px; /* Agrega un espacio entre la imagen y los botones */
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center; /* Centra los botones horizontalmente */
  width: 100%; /* Ajusta el ancho al 100% */
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
  margin: 0 8px; /* Agrega espacio entre los botones */
`;

const IconContainer = styled.span`
  margin-right: 8px;
`;

const EquipamientoMedicoListItem = ({ equipamiento }) => {
  const [expanded, setExpanded] = useState(true);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSolicitar = () => {
    // Lógica para manejar la acción de solicitar
    console.log('Solicitar:', equipamiento.eq_name);
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
