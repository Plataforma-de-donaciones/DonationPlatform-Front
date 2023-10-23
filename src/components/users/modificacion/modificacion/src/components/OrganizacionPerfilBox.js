import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../../../../../axios_instance";
import Cookies from "universal-cookie";

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #D9D5DC;
  background-color: transparent;
  flex-direction: column;
  position: relative;
`;

const PerfilOrganizacionText = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  font-style: normal;
  font-weight: 700;
`;

const Select = styled.select`
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

const cookies = new Cookies();

function OrganizacionPerfilBox({ selectedOrganization, onChange }) {
  const [organizaciones, setOrganizaciones] = useState([]);
  const [userOrganization, setUserOrganization] = useState(null);

  useEffect(() => {
    const token = cookies.get("token");

    instance
      .get("/organizations/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setOrganizaciones(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener organizaciones:", error);
      });

    setUserOrganization(selectedOrganization);
  }, [selectedOrganization]);

  const handleOrganizacionChange = (e) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <Container>
      <PerfilOrganizacionText>Organización</PerfilOrganizacionText>
      <Select onChange={handleOrganizacionChange} value={userOrganization}>
        <option value="" disabled hidden>
          Selecciona una organización
        </option>
        {organizaciones.map((org) => (
          <option key={org.id} value={org.id}>
            {org.org_name}
          </option>
        ))}
        <option value={null}>Sin organización</option>
      </Select>
    </Container>
  );
}

export default OrganizacionPerfilBox;
