import React from "react";
import styled from "styled-components";

const OrganizationsSelector = ({ organizations, selectedOrganization, onChange }) => {
  return (
    <Container>
    <OrganizationLabel>Organización</OrganizationLabel>
    <Selector
      value={selectedOrganization}
      onChange={onChange}
    >
      <option value="" disabled>Selecciona una organización</option>
      {organizations.map(org => (
        <option key={org.id} value={org.id}>{org.org_name}</option>
      ))}
    </Selector>
  </Container>
  );
};

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #D9D5DC;
  background-color: transparent;
  flex-direction: column;
  position: relative;
`;

const OrganizationLabel = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  font-style: normal;
  font-weight: 700;
  left: 0px;
  width: 375px;
  top: 0px;
  height: 31px;
`;

const Selector = styled.select`
  border-bottom-width: 1px;
  border-color: #D9D5DC;
  color: #000;
  font-size: 14px;
  align-self: stretch;
  line-height: 16px;
  padding-top: 8px;
  flex: 1 1 0%;
  padding-bottom: 8px;
  width: 375px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

export default OrganizationsSelector;
