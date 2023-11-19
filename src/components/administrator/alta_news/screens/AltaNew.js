import React from "react";
import NewBox from "../components/NewBox";
import styled from "styled-components";
import MenuComponent from "../../list_users/components/MenuComponent";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  width: 100%;
`;

const Content = styled.div`
  grid-row: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  position: relative;
`;

function AltaNew(props) {
  return (
    <Container>
      <MenuComponent />
      <Content>
        <NewBox />
      </Content>
    </Container>
  );
}

export default AltaNew;
