import React, { useState, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import styled from "styled-components";


const HelperText = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
  font-style: normal;
  font-weight: 400;
`;

function NombreDonEdicionBox({ value, onChange }) {
  return (
    <>
      <Form.Group as={Col} md="12" controlId="validationCustom01">

        <Form.Label>¿Cuál es su nombre? *</Form.Label>

        <Form.Control
          value={value}
          required
          type="text"
          placeholder="Nombre del voluntario/a"
          onChange={onChange}
          maxlength={50}
          minLength={3}
        />

        <Form.Control.Feedback type="invalid">
          Por favor digite su nombre
        </Form.Control.Feedback>
        <Form.Control.Feedback>Campo válido!</Form.Control.Feedback>
        <HelperText>Este dato se visualiza en la publicación.</HelperText>
      </Form.Group>
{/* 
      <Container>
        <Label>Nombre de la donación *</Label>
        <InputStyle
          placeholder="Nombre de la donación"
          value={value}
          onChange={onChange}
        />
      </Container> */}
    </>

  );
}
const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #d9d5dc;
  background-color: transparent;
  flex-direction: column;
  position: relative;
`;

const Label = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  font-style: normal;
  font-weight: 700;
`;

const InputStyle = styled.input`
  color: #000;
  font-size: 14px;
  align-self: stretch;
  flex: 1 1 0%;
  line-height: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

export default NombreDonEdicionBox;
