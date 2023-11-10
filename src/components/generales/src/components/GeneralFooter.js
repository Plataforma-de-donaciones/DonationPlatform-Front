import React from "react";
import styled, { css } from "styled-components";
import AcercaDeButton from "./AcercaDeButton";
import ContactoButton from "./ContactoButton";
import PreguntasButton from "./PreguntasButton";
import TerminosCondicionesButton from "./TerminosCondicionesButton";

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

const Container = styled.div`
  @media (min-width: 1px) {
    display: flex;
    bottom: 0;
    left: 0;
    position: fixed;
    justify-content: space-between;

    background-color: rgba(141, 202, 170, 1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding-right: 1rem; 
    padding-left: 1rem;

    width: 100%;
    height: 50px;
  }
`;

const ButtonWrapper = styled.div`
  padding-top: 1rem; 
  
  &:hover {
    color: rgba(80,80,80, 1);
  }
`;

export default GeneralFooter;
