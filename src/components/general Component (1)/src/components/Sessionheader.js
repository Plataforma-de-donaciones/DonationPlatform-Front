import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  background-color: rgba(255, 152, 0, 0.59);
  flex-direction: row;
  align-items: center;
  padding: 4px;
  justify-content: space-between;
  position: relative;
  box-shadow: 0px 2px 1.2px 0.2px #111;

  @media (max-width: 768px) {
    padding: 2px; /* Ajusta el padding en pantallas más pequeñas */
  }
`;

const Center = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  pointer-events: none;

  ${props =>
    ((props.horizontal && !props.vertical) ||
      (!props.horizontal && !props.vertical)) &&
    css`
      align-items: center;
    `};

  ${props =>
    ((props.vertical && !props.horizontal) ||
      (!props.horizontal && !props.vertical)) &&
    css`
      justify-content: center;
    `};
`;

const TextWrapper = styled.div`
  position: absolute;
  display: flex;
`;

const LoginTittle = styled.span`
  font-size: 20px;
  color: rgba(0, 0, 0, 1);
  background-color: transparent;
  line-height: 18px;
  font-weight: 600;
  align-self: center;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 16px; /* Reduzca el tamaño del texto en pantallas más pequeñas */
    padding-left: 8px; /* Ajusta el padding izquierdo en pantallas más pequeñas */
    padding-right: 8px; /* Ajusta el padding derecho en pantallas más pequeñas */
  }
`;

function Sessionheader(props) {
  return (
    <Container {...props}>
      <Center>
        <TextWrapper>
          <LoginTittle numberOfLines={1}>Iniciar sesión</LoginTittle>
        </TextWrapper>
      </Center>
    </Container>
  );
}

export default Sessionheader;
