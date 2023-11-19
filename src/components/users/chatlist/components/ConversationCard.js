import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ConversacionTarjetaContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Usuario = styled.h3`
  margin: 0;
`;

const AbrirConversacionButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  margin-top: 8px;
`;

const ConversationCard = ({ conversacion, userId }) => {
  const otroUsuario =
    userId === conversacion.user_1_info.user_id
      ? conversacion.user_2_info
      : conversacion.user_1_info;

  return (
    <ConversacionTarjetaContainer>
      <Usuario>{`Chat con ${otroUsuario.user_name}`}</Usuario>
      <Link to={`/conversaciones/${conversacion.conv_id}`}>
        <AbrirConversacionButton>Abrir Conversación</AbrirConversacionButton>
      </Link>
    </ConversacionTarjetaContainer>
  );
};

export default ConversationCard;

