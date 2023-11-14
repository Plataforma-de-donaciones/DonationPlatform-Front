import React from "react";
import styled from "styled-components";

function UserInput(props) {
  return (
    <Container>
      <EmailUserPlaceholder
        placeholder="Correo electrónico o nombre de usuario"
        value={props.value}
        onChange={props.onChange}
        name={props.name}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%; // Ocupar todo el ancho disponible
`;

const EmailUserPlaceholder = styled.input`
  color: rgba(80,80,80, 1);
  padding-right: 16px;
  font-size: 14px;
  align-self: center;
  flex: 1;
  line-height: 16px;
  padding-top: 14px;
  padding-bottom: 8px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  width: 100%; // Ocupar todo el ancho disponible
`;

export default UserInput;
