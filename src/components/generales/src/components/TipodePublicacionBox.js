import { useState } from "react";
import styled from "styled-components";
import { Form } from "react-bootstrap";

const HelperText = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
  font-style: normal;
  font-weight: 400;
`;

const TipodePublicacionBox = ({ onSelect, ...props }) => {
  const [selectedValue, setSelectedValue] = useState(""); 

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value); 
    onSelect(value); 
  };

  return (
    <Form.Group className="mb-3" controlId="validationCustom01">
    <Form.Label>Tipo de publicación: </Form.Label>

      {props.defaultValue && (
        <Form.Select
          required
          disabled
          value={props.defaultValue}
          aria-label="Default select example"
        >
          <option value="" disabled hidden>
            Selecciona una opción
          </option>
          <option value="1">Solicitud</option>
          <option value="2">Ofrecimiento</option>
        </Form.Select>
      )}

      {!props.defaultValue && (
        <Form.Select
          value={selectedValue}
          onChange={handleSelectChange}
          aria-label="Default select example"
          required
        >
          <option value="" disabled hidden>
            Selecciona una opción
          </option>
          <option value="1">Solicitud</option>
          <option value="2">Ofrecimiento</option>
        </Form.Select>
      )}

      <Form.Control.Feedback required type="invalid">
      Por favor ingrese el tipo de publicación, no puede estar vacío.
      </Form.Control.Feedback>
      <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
      <HelperText>Este dato se visualiza en la publicación.</HelperText>
    </Form.Group>
  );
};

const Container = styled.div`
  display: flex;
  background-color: transparent;
  flex-direction: column;
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

const SelectStyle = styled.select`
  border-bottom-width: 1px;
  border-color: #d9d5dc;
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

const Helper = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
`;

export default TipodePublicacionBox;
