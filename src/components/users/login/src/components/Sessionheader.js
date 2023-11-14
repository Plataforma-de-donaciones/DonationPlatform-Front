import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  background-color: rgba(79,181,139, 1);
  flex-direction: row;
  align-items: center;
  padding: 4px;
  justify-content: space-between;
  position: relative;
  
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  color: #FFFFFF;
  text-shadow:  0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: transparent;
  line-height: 18px;
  font-weight: 500;
  align-self: center;
  text-align: left;

  @media (max-width: 350px) {
    font-size: 18px; /* Reduzca el tamaño del texto en pantallas más pequeñas */
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
