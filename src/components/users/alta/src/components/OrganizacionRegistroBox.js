import React from "react";
import styled from "styled-components";

function OrganizacionRegistroBox(props) {
  return (
    <Container>
      <Label>Organización</Label>
      <Input
        placeholder="Pon el nombre de la organización a la que perteneces."
        value={props.value}
        onChange={props.onChange}
        name={props.name}
      />
      <HelperText>
        Si perteneces a una organización, ingrésalo aquí.
      </HelperText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  background-color: rgba(255, 255, 255, 1);
  width: 100%;
`;

const Label = styled.label`
  font-size: 12px;
  text-align: left;
  color: rgba(0, 0, 0, 1);
  opacity: 0.6;
  padding-top: 16px;
`;

const Input = styled.input`
  color: #000;
  font-size: 14px;
  align-self: stretch;
  line-height: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border: none;
  background: transparent;
  border-bottom: 1px solid #D9D5DC;
  width: 100%;
`;

const HelperText = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
`;

export default OrganizacionRegistroBox;
