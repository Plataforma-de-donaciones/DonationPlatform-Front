import React, { useState } from "react";
import styled from "styled-components";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: transparent;
  flex-direction: row;
  cursor: pointer; /* Agregamos cursor pointer para indicar que es interactivo */
`;

const CheckLabel = styled.span`
  margin-left: 2px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 700;
  align-self: center;
`;

const TeryCondCheckbox = (props) => {
  const { checked, onChange } = props;

const handleClick = () => {
  if (onChange) {
    onChange(!checked); 
  }
};


  return (
    <Container onClick={handleClick}>
      {checked ? (
        <MdCheckBox
          style={{
            color: "rgba(255,152,0,1)",
            fontSize: 25,
            lineHeight: "28px",
            alignSelf: "center",
          }}
        />
      ) : (
        <MdCheckBoxOutlineBlank
          style={{
            color: "rgba(255,152,0,1)",
            fontSize: 25,
            lineHeight: "28px",
            alignSelf: "center",
          }}
        />
      )}
      <CheckLabel>
        {props.label || "Al enviar este formulario acepto los"}
      </CheckLabel>
    </Container>
  );
};

export default TeryCondCheckbox;
