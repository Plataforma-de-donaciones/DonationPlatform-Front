import React from "react";
import styled from "styled-components";
import Swal from 'sweetalert2'

function NombreRegistroBox(props) {
  return (
    <Container>
      <Label>¿Cuál es tu nombre completo?*</Label>
      <Input
        placeholder="Nombre y Apellido"
        type="text"
        {...props} // Puedes pasar las props adicionales si es necesario
      />
      {props.mensaje && <div style={{ color: "red" }}>{props.mensaje}</div>}
      <Helper>Esto aparece en tu perfil</Helper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
`;

const Label = styled.label`
  font-size: 12px;
  text-align: left;
  color: rgba(0, 0, 0, 0.6);
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
  border-bottom: 1px solid #d9d5dc;
  width: 100%; // Ocupar todo el ancho disponible
`;

const Helper = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
`;

export default NombreRegistroBox;
