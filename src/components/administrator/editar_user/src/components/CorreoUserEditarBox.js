import React, { useState, useEffect } from "react";
import styled from "styled-components";

function CorreoUserEditarBox({ value, onChange, ...props }) {
  const [correo, setCorreo] = useState("");

  useEffect(() => {
    if (value !== undefined) {
      setCorreo(value);
    }
  }, [value]);

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Container {...props}>
      <Correo>Correo</Correo>
      <InputStyle
        value={correo}
        onChange={handleCorreoChange}
        autoCorrect={true}
        inlineImagePadding={0}
        numberOfLines={3}
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

const Correo = styled.span`
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

const InputStyle = styled.input`
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

export default CorreoUserEditarBox;
