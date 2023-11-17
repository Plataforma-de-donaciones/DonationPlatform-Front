import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

function CancelarButton(props) {
  const history = useHistory();

  const handleClick = () => {
    if (history) {
      history.push("/listadoapadrinamiento");
    } else {
      console.warn("La prop 'history' no está presente. No se puede realizar la redirección.");
    }
  };

  return (
    <Container onClick={handleClick} {...props}>
      <Cancelar>Cancelar</Cancelar>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(155, 155, 155, 1);
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 100px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 1px 5px 0.35px #000;
  cursor: pointer;
  &:hover {
    background-color: rgba(155, 155, 155, 0.8);
  }

  &:active {
    background-color: rgba(155, 155, 155, 0.6);
  }
`;

const Cancelar = styled.span`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
`;

export default CancelarButton;
