import React from "react";
import EditarDonBox from "../components/EditarDonBox";
import styled from "styled-components";
import Menu from "../../../../generales/src/components/Menu";
import GeneralFooter from "../../../../users/login/src/components/GeneralFooter";
import GeneralHeader from "../../../../generales/src/components/GeneralHeader";
import Layout from "./../../../../generales/src/components/layout/Layout";
import { Card, CardBody } from "react-bootstrap";

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
  margin-bottom: 10px;
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

//url:editardonacion/id
function EditarDonacion(props) {
  return (
    <>
      <Layout>
          <EditarDonBox />
      </Layout>
    </>
  );
}

export default EditarDonacion;
