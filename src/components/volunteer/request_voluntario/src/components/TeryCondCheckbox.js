import React, { useState } from "react";
import styled from "styled-components";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

const Container = styled.div`
  
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: transparent;
  flex-direction: row;
  cursor: pointer; /* Agregamos cursor pointer para indicar que es interactivo */
`;

const CheckLabel = styled.span`
  margin-left: 4px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 700;

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
            color: "rgba(79, 181, 139, 1)",
            fontSize: 25,
               
          }}
        />
      ) : (
        <MdCheckBoxOutlineBlank
          style={{
            color: "rgba(79, 181, 139, 1)",
            fontSize: 25,
           
          }}
        />
      )}
      <CheckLabel required>
        {props.label || "Al enviar este formulario acepto los términos y condiciones"}
      </CheckLabel>
    </Container>
  );
};

export default TeryCondCheckbox;
