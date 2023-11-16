import React from "react";
import styled from "styled-components";
import { Col, Form } from "react-bootstrap";

function TipoDePublicacionDonEdicionBox({ selectedType, ...props }) {
  return (
    <>
    
    
    <Container {...props}>
      <TipoDePublicacion>Tipo de publicación</TipoDePublicacion>
      <Donacion>{selectedType}</Donacion>
    </Container>
    </>
  );
}

const HelperText = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
  font-style: normal;
  font-weight: 400;
`;

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #d9d5dc;
  background-color: transparent;
  flex-direction: column;
`;

const TipoDePublicacion = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  font-style: normal;
  font-weight: 700;
`;

const Donacion = styled.span`
  color: #000;
  font-size: 14px;
  align-self: stretch;
  flex: 1 1 0%;
  line-height: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
`;

export default TipoDePublicacionDonEdicionBox;
