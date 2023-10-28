import React from "react";
import styled from "styled-components";

function CorreoRegistroBox(props) {
  return (
    <Container>
      <Label>¿Cuál es tu correo electrónico?*</Label>
      <Input
        placeholder="Pon tu correo electrónico."
        type="email"
        value={props.value}
        onChange={props.onChange}
        name={props.name}
      />
      <HelperText>
        Esto queda visible únicamente entre usuarios para gestionar solicitudes.
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
  display: block;
  width: 175px;
  height: 29px;
`;

const Input = styled.input`
  color: rgba(0, 0, 0, 1);
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
  color: rgba(0, 0, 0, 1);
  opacity: 0.6;
  padding-top: 8px;
  display: block;
`;

export default CorreoRegistroBox;
