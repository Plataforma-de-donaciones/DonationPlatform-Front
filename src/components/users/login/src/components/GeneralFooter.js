import React from "react";
import styled from "styled-components";
import ContactoButton from "./ContactoButton";
import PreguntasButton from "../../../../generales/src/components/PreguntasButton";
import TerminosCondicionesButton from "./TerminosCondicionesButton";
import AcercaDeButton from "../../../../generales/src/components/AcercaDeButton";

const Container = styled.div`
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background-color: rgba(79, 181, 139, 1);
  align-items: center;
  padding: 10px;
  color:white;
  
`;

const ButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 200px; /* Ancho máximo para cada botón */
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
