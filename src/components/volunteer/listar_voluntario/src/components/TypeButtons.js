import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* Centra los elementos horizontalmente */
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  margin: 0 10px;
  position: relative;
  display: flex;
  align-items: center; /* Centra verticalmente el contenido */
  text-align: center; /* Centra horizontalmente el texto */

  &:before,
  &:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: #000; /* Puedes ajustar el color de la línea */
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
  }
`;

const TypeButtons = () => {
  const history = useHistory();

  const handleButton1Click = () => {
    history.push('/listadovoluntariado');
  };

  const handleButton2Click = () => {
    history.push('/listadoapadrinamiento');
  };

  return (
    <ButtonContainer>
      <Button onClick={handleButton1Click}>Voluntarios</Button>
      <Button onClick={handleButton2Click}>Padrinos</Button>
    </ButtonContainer>
  );
};

export default TypeButtons;
