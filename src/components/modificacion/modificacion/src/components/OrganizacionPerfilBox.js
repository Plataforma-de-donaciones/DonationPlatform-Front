import React from "react";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #D9D5DC;
  background-color: transparent;
  flex-direction: column;
  position: relative;
`;

const PerfilOrganizacionText = styled.span`
  font-family: Roboto;
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  font-style: normal;
  font-weight: 700;
`;

const PerfilOrganizacionBbdd = styled.input`
  font-family: Roboto;
  color: #000;
  font-size: 14px;
  align-self: stretch;
  flex: 1 1 0%;
  line-height: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

const PencilIcon = styled(MdEdit)`
  top: 37px;
  left: 358px;
  position: absolute;
  color: rgba(0, 0, 0, 1);
  font-size: 20px;
  right: 0;
  bottom: 0;
`;

function OrganizacionPerfilBox(props) {
  return (
    <Container {...props}>
      <PerfilOrganizacionText>Organización</PerfilOrganizacionText>
      <PerfilOrganizacionBbdd placeholder="Crustáceo Cascarudo"></PerfilOrganizacionBbdd>
      <PencilIcon />
    </Container>
  );
}

export default OrganizacionPerfilBox;
