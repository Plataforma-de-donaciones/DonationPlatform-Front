import React, { Component } from "react";
import styled, { css } from "styled-components";
import GeneralHeader from "../components/GeneralHeader";
import PerfilBox from "../components/PerfilBox";
import GeneralFooter from "../components/GeneralFooter";

function ModificarUsuario(props) {
  return (
    <Container>
      <GeneralHeaderColumn>
        <GeneralHeader
          style={{
            width: 1366,
            height: 87
          }}
        ></GeneralHeader>
        <PerfilBox
          style={{
            height: 620,
            width: 400,
            marginLeft: 483
          }}
        ></PerfilBox>
      </GeneralHeaderColumn>
      <GeneralHeaderColumnFiller></GeneralHeaderColumnFiller>
      <GeneralFooter
        style={{
          width: 1366,
          height: 60,
          shadowRadius: 0,
          alignSelf: "center",
          boxShadow: "3px 3px 0px  0.01px rgba(0,0,0,1) "
        }}
      ></GeneralFooter>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const GeneralHeaderColumn = styled.div`
  width: 1366px;
  flex-direction: column;
  display: flex;
`;

const GeneralHeaderColumnFiller = styled.div`
  flex: 1 1 0%;
  flex-direction: column;
  display: flex;
`;

export default ModificarUsuario;
