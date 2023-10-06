import React from "react";
import GeneralHeader from "../../../../inicio/src/components/GeneralHeader"
import PerfilBox from "../components/PerfilBox";
import GeneralFooter from "../components/GeneralFooter";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  width: 100%;
`;

const Header = styled(GeneralHeader)`
  grid-row: 1;
`;

const Content = styled.div`
  grid-row: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  position: relative;
`;

const Footer = styled(GeneralFooter)`
  grid-row: 3;
`;

function ModificarUsuario(props) {
  return (
    <Container>
      <Header />
      <Content>
        <PerfilBox />
      </Content>
      <Footer />
    </Container>
  );
}

export default ModificarUsuario;
