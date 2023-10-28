import React, { useState } from "react";
import styled from "styled-components";
import GeneralHeader from "../../../../generales/src/components/GeneralHeader";
import GeneralFooter from "../../../../generales/src/components/GeneralFooter";
import ListadoPaginado from "../components/ListadoPaginado";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  width: 100%;
`;

const Rect = styled.div`
  width: 60%;
  background-color: rgba(255, 152, 0, 0.6);
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  padding: 6px 0px 0px 0px;
  text-align: center;
`;

const PerfilText = styled.span`
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  text-align: center;
  margin-top: 6px;
`;

const GeneralHeaderColumn = styled.div`
  grid-row: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center; /* Para centrar horizontalmente el contenido */
`;

const GeneralHeaderColumnFiller = styled.div`
  flex: 1 1 0%;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  margin-top: 16px;
`;

const Content = styled.div`
  grid-row: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  position: relative;
`;

const GeneralFooterStyled = styled(GeneralFooter)`
  grid-row: 3;
`;

function ListarSolicitudesPropios(props) {
  const [tipo, setTipo] = useState("donations");

  return (
    <Container>
      <GeneralHeaderColumn>
        <GeneralHeader
          style={{
            width: "100%",
            margin: "0 auto",
          }}
        />
        <Rect>
          <PerfilText>Mis Solicitudes</PerfilText>
        </Rect>
        <ButtonContainer>
          <button onClick={() => setTipo("donations")}>Donaciones</button>
          <button onClick={() => setTipo("medicalequipments")}>Equipamiento Médico</button>
          <button onClick={() => setTipo("volunteers")}>Voluntarios</button>
          <button onClick={() => setTipo("sponsors")}>Sponsor</button>
        </ButtonContainer>
      </GeneralHeaderColumn>
      <GeneralHeaderColumnFiller />
      <Content>
        <ListadoPaginado tipo={tipo} />
      </Content>
      <GeneralFooterStyled
        style={{
          width: "100%",
          maxWidth: "1366px",
          margin: "0 auto",
          height: "60px",
          shadowRadius: 0,
          alignSelf: "center",
          boxShadow: "3px 3px 0px  0.01px rgba(0,0,0,1) "
        }}
      />
    </Container>
  );
}

export default ListarSolicitudesPropios;
