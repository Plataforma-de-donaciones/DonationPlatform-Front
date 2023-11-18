import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import styled from 'styled-components';

const DateTimePicker = ({ value, onChange }) => {
  const handleDateChange = (date) => {
    onChange && onChange(date.toISOString());
  };

  return (
    <>
      <Form.Label>Fecha y Hora de Inicio *</Form.Label>
      
      <Datetime
        value={value ? new Date(value) : null}
        onChange={handleDateChange}
        dateFormat="YYYY-MM-DD"
        timeFormat="HH:mm:ss"

        inputProps={{ placeholder: 'Seleccione fecha y hora de inicio del evento' , required: true}}
      
      />
     
      <Form.Control.Feedback type="invalid">
        Localidad es requerida
      </Form.Control.Feedback>

      <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
      <HelperText>Este dato se visualiza en la publicación.</HelperText>
      </>
   
   
   );
};


const HelperText = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
  width: 375px;
  height: 20px;
`;

export default DateTimePicker;
