import React, { useState, useEffect } from "react";
import styled from "styled-components";

function DescripcionDonEditarBox({ value, onChange, ...props }) {
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    // Actualizar el estado de la descripción cuando se proporciona un nuevo valor
    if (value !== undefined) {
      setDescripcion(value);
    }
  }, [value]);

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Container {...props}>
      <Descripcion>Descripción *</Descripcion>
      <TextInput
        value={descripcion}
        onChange={handleDescripcionChange}
        autoCorrect={true}
        inlineImagePadding={0}
        numberOfLines={1}
        selectTextOnFocus={false}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #D9D5DC;
  background-color: transparent;
  flex-direction: column;
  position: relative;
`;

const Descripcion = styled.span`
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

const TextInput = styled.input`
  color: #000;
  font-size: 14px;
  align-self: stretch;
  flex: 1 1 0%;
  line-height: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  bottom: 0px;
  top: 0px;
  inline-image-left: ;
  width: 375px;
  height: 148px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

export default DescripcionDonEditarBox;
