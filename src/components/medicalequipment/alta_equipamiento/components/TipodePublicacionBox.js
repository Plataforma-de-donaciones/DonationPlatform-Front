import React, { useState } from "react";
import styled from "styled-components";

const TipodePublicacionBox = ({ onSelect, ...props }) => {
  const [selectedValue, setSelectedValue] = useState(""); // Estado para almacenar el valor seleccionado

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value); // Actualizar el estado al seleccionar una opción
    onSelect && onSelect(value); // Llamar a la función onSelect proporcionada por el componente padre
  };

  return (
    <Container {...props}>
      <Label>Tipo de publicación *</Label>
      <SelectStyle value={selectedValue} onChange={handleSelectChange}>
        <option value="" disabled hidden>
          Selecciona una opción
        </option>
        <option value="1">Solicitud</option>
        <option value="2">Ofrecimiento</option>
      </SelectStyle>
      <Helper>Este dato se refleja en las secciones correspondientes</Helper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: transparent;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  font-style: normal;
  font-weight: 700;
`;

const SelectStyle = styled.select`
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

const Helper = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
`;

export default TipodePublicacionBox;
