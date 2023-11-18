import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const DateTimePickerFinal = ({ value, onChange }) => {
  const handleDateChange = (date) => {
    onChange && onChange(date.toISOString());
  };

  return (
    <>
      <Form.Label>Fecha y Hora de Finalización *</Form.Label>
      <Datetime
        value={value ? new Date(value) : null}
        onChange={handleDateChange}
        dateFormat="YYYY-MM-DD"
        timeFormat="HH:mm:ss"
        inputProps={{ placeholder: 'Seleccione fecha y hora de finalización del evento' , required: true,}}
      />
      <Form.Control.Feedback type="invalid">
       La fecha y hora del evento es requerida
      </Form.Control.Feedback>

      <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
      <HelperText>Este dato se visualiza en la publicación.</HelperText>
      
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 12px;
  text-align: left;
  color: rgba(0, 0, 0, 1);
  opacity: 0.6;
  padding-top: 16px;
  width: 375px;
  font-style: normal;
  font-weight: 700;
`;

const HelperText = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
  width: 375px;
  height: 20px;
`;

export default DateTimePickerFinal;
