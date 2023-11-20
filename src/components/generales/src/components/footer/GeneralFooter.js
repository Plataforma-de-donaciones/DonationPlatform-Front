import React from "react";
import styled from "styled-components";
import ContactoButton from "../../../../users/login/src/components/ContactoButton";
import PreguntasButton from "../PreguntasButton";
import TerminosCondicionesButton from "../../../../users/login/src/components/TerminosCondicionesButton";
import AcercaDeButton from "../AcercaDeButton";

const Container = styled.div`
  @media (min-width: 1px) {
    display: flex;
    position: sticky;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
    left: 0;
    padding-right: 1rem; 
    padding-left: 1rem;

    background-color: rgba(141, 202, 170, 1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;

    width: 100%;
    height: 50px;

    z-index: 1; /* Asegura que esté adelante de otros elementos */
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }

  @media (max-width: 530px) {
    height: 65px;
    align-items: start;
  }
`;

const ButtonWrapper = styled.div`
  margin: 10px; /* Espaciado entre botones */  
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
