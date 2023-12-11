import React from "react";
import styled from "styled-components";
import ContactoButton from "../../../../users/login/src/components/ContactoButton";
import PreguntasButton from "../PreguntasButton";
import TerminosCondicionesButton from "../../../../users/login/src/components/TerminosCondicionesButton";
import AcercaDeButton from "../AcercaDeButton";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    position: sticky;
    bottom: 0;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    background-color: rgba(141, 202, 170, 1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;

    width: 100%;
    min-width: 443px;
    height: 50px;
    margin-top: auto;

    z-index: 1000; /* Asegura que esté adelante de otros elementos */
    @media (max-width: 524px) {
      height: 50px;
      align-items: start;
      padding-right: 0.5rem; 
      padding-left: 0.5rem;
    }

  @media (max-width: 508px) {
    height: 65px;
    align-items: start;
    padding-right: 0.5rem; 
    padding-left: 0.5rem;
  }

  @media (max-width: 443px) {
    width: 100%;
    position: fixed;
  }
`;

const ButtonWrapper = styled.div`
  margin: 10px; /* Espaciado entre botones */  
  @media (max-width: 524px) {
    margin-top: 0rem;

  }
  @media (max-width: 508px) {
    margin-top: -0.3rem;
  }

`;

const GeneralFooter = () => {
  return (
    <footer>
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
    </footer>
  );
};

export default GeneralFooter;
