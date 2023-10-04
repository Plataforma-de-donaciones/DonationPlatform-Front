import React from "react";
import styled from "styled-components";

function EliminarCuentaButton(props) {
  return (
    <Container {...props}>
      <EliminarCuentaText>Eliminar cuenta</EliminarCuentaText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(255,152,0,1);
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  min-width: 88px; /* Establece un ancho mínimo */
  padding: 8px 16px; /* Ajusta el espacio interno */
  box-shadow: 0px 1px 5px  0.35px rgba(0,0,0,1);
  margin-top: 20px; /* Agrega margen superior */
`;

const EliminarCuentaText = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

export default EliminarCuentaButton;
