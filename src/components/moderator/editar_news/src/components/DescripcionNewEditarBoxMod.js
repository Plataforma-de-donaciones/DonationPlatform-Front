import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Col, Form } from "react-bootstrap";


function DescripcionNewEditarBoxMod({ value, onChange, ...props }) {
  const [descripcion, setDescripcion] = useState("");

  const HelperText = styled.span`
    font-size: 10px;
    text-align: left;
    color: #000;
    opacity: 0.6;
    padding-top: 8px;
    font-style: normal;
    font-weight: 400;
  `;

  useEffect(() => {
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
    /*<Container {...props}>
      <Descripcion>Descripción *</Descripcion>
      <TextareaStyle
        value={descripcion}
        onChange={handleDescripcionChange}
        autoCorrect={true}
        inlineImagePadding={0}
        numberOfLines={3}
        selectTextOnFocus={false}
      />
    </Container>*/
    <>
      <p></p>
      <Form.Group as={Col} md="12" controlId="validationCustom01">
        <Form.Label>Descripción *</Form.Label>

        <Form.Control
          as="textarea"
          value={descripcion}
          required
          type="text"
          placeholder="Describa la noticia"
          onChange={handleDescripcionChange}
          maxlength={250}
          minLength={3}
          autoCorrect={true}
          inlineImagePadding={0}
          numberOfLines={1}
          selectTextOnFocus={false}
        />

        <Form.Control.Feedback type="invalid">
          La descripción de la noticia no puede estar vacía
        </Form.Control.Feedback>
        <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
        <HelperText>Este dato se visualiza en la publicación.</HelperText>
      </Form.Group>
      </>
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

const TextareaStyle = styled.textarea`
  border: 1px solid #D9D5DC;
  color: #000;
  font-size: 14px;
  line-height: 16px;
  padding: 8px;
  width: 375px;
  background: transparent;
  resize: vertical; 
`;

export default DescripcionNewEditarBoxMod;
