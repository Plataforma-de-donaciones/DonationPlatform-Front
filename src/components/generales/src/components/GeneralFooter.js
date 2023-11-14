import React from "react";
import styled, { css } from "styled-components";
import AcercaDeButton from "./AcercaDeButton";
import ContactoButton from "./ContactoButton";
import TerminosCondicionesButton from "./TerminosCondicionesButton";
import PreguntasButton from "./PreguntasButton";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background-color: rgba(255, 152, 0, 1);
  align-items: center;
  box-shadow: 0px -2px 1.2px 0.2px #111;
  padding: 10px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 200px;
  margin: 10px;

  @media (max-width: 768px) {
    max-width: none;
  }
`;

const GeneralFooter = () => {
  return (
    <Container>
      <ButtonWrapper>
        <AcercaDeButton />
      </ButtonWrapper>
      <ButtonWrapper>
        <ContactoButton />
      </ButtonWrapper>
      <ButtonWrapper>
        <PreguntasButton />
      </ButtonWrapper>
      <ButtonWrapper>
        <TerminosCondicionesButton />
      </ButtonWrapper>
    </Container>
  );
};

export default GeneralFooter;
