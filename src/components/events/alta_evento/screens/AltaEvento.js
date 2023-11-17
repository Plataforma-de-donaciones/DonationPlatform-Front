import React from "react";
import GeneralHeader from "../../../generales/src/components/GeneralHeader";
import GeneralFooter from "../../../generales/src/components/GeneralFooter";
import Menu from "../../../generales/src/components/Menu";
import EventoBox from "../components/EventoBox";
import styled from "styled-components"; 
import Layout from './../../../generales/src/components/layout/Layout';


const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto; 
  min-height: 100vh; 
  width: 100%;
`;

const Header = styled(GeneralHeader)`
  grid-row: 1; 
`;
const Menus = styled(Menu)`
  grid-row: 2; 
`;
const Content = styled.div`
  grid-row: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); 
  position: relative;
`;

const Footer = styled(GeneralFooter)`
  grid-row: 4; 
`;
//url:altaevento
function AltaEvento(props) {
  return (
    <Layout>
      <EventoBox />
    </Layout>
  );
}

export default AltaEvento;
