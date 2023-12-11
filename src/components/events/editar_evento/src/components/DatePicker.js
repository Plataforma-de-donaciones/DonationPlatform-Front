import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import styled from 'styled-components';
import moment from 'moment';
import { Form, Col } from "react-bootstrap";

const DateTimePicker = ({ value, onChange }) => {
  const handleDateChange = (date) => {

    const formattedDate = date ? new Date(date.toDate()) : null;
    onChange && onChange(formattedDate);
  };

  return (
    <Container>
      <Label>Fecha y Hora de inicio *</Label>
      <Datetime
        value={value ? moment(value) : null}
        onChange={handleDateChange}
        dateFormat="YYYY-MM-DD"
        timeFormat="HH:mm:ss"
        inputProps={{ placeholder: 'Seleccione fecha y hora de inicio del evento' }}
      />
      <Form.Control.Feedback required type="invalid">
        Por favor ingrese la fecha y hora inicio, no puede estar vacía.
        </Form.Control.Feedback>
        <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
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
