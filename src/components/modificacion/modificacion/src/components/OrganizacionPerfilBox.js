// En OrganizacionPerfilBox.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Axios from 'axios';

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

function OrganizacionPerfilBox({ onChange }) {
  const [organizaciones, setOrganizaciones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacer la solicitud a la API de Django usando Axios
    Axios.get('https://192.168.1.14/organizations/', {
      headers: {
        'Authorization': 'Token e2fa4c057c611857bb0c8aefc62ee3861017fe77',
      },
    })
      .then(response => {
        // Al recibir los datos, actualiza el estado con las organizaciones
        setOrganizaciones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener organizaciones:', error);
      });
  }, []); // El segundo parámetro [] asegura que useEffect se ejecute solo una vez al montar el componente

  const handleOrganizacionChange = (e) => {
    const { value } = e.target;
    onChange({
      target: {
        name: "organization",  // Asigna el nombre del campo que quieras que tenga
        value,
      },
    });
  };

  return (
    <Container>
      <PerfilOrganizacionText>Organización</PerfilOrganizacionText>
      <Select onChange={handleOrganizacionChange}>
        <option value="" disabled hidden>
          Selecciona una organización
        </option>
        {organizaciones.map(org => (
          <option key={org.id} value={org.id}>
            {org.org_name}
          </option>
        ))}
      </Select>
    </Container>
  );
}

export default OrganizacionPerfilBox;
