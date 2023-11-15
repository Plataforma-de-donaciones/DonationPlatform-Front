import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import styled from 'styled-components';
import moment from 'moment';

const DateTimePicker = ({ value, onChange }) => {
  const handleDateChange = (date) => {
    // Verifica si date es null o undefined antes de convertirlo
    const formattedDate = date ? new Date(date.toDate()) : null;
    onChange && onChange(formattedDate);
  };

  return (
    <Container>
      <Label>Fecha y Hora de Inicio *</Label>
      <Datetime
        value={value ? moment(value) : null}
        onChange={handleDateChange}
        dateFormat="YYYY-MM-DD"
        timeFormat="HH:mm:ss"
        inputProps={{ placeholder: 'Seleccione fecha y hora de inicio del evento' }}
      />
      <HelperText>Este dato se visualiza en la publicación.</HelperText>
    </Container>
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

export default DateTimePicker;
