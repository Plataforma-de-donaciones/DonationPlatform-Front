import React from "react";
import styled from "styled-components";
import AcercaDeButton from "../../../../alta/src/components/AcercaDeButton";
import ContactoButton from "../../../../alta/src/components/ContactoButton";
import PreguntasButton from "../../../../alta/src/components/PreguntasButton";
import TerminosCondicionesButton from "../../../../alta/src/components/TerminosCondicionesButton";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* Columnas autoajustables */
  background-color: rgba(255, 152, 0, 1);
  align-items: center;
  box-shadow: 0px -2px 1.2px 0.2px #111;
  padding: 10px; /* Espaciado interno */
`;

const ButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 200px; /* Ancho máximo para cada botón */
  margin: 10px; /* Espaciado entre botones */
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
