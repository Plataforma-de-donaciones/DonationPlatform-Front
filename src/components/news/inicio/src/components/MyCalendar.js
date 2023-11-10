// MyCalendar.js
import React from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const MyCalendar = ({ events }) => {
  return (
    <StyledCalendar
      tileContent={({ date }) => {
        const formattedDate = formatDate(date);
        const matchingEvent = events.find(event => formatDate(new Date(event.start_date)) === formattedDate);
        return matchingEvent ? (
          <EventMarker eventName={matchingEvent.event_name} />
        ) : null;
      }}
    />
  );
};

const EventMarker = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  background-color: rgba(79,181,139, 1); /* o el color que desees */
  border-radius: 50%;
  cursor: default;

  &:hover::after {
    content: "${props => props.eventName}";
    position: fixed; /* Cambia a posición fija para que aparezca por encima del calendario */
    top: 50%; /* Ajusta la posición según sea necesario */
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.8);
    color: white;
    padding: 4px;
    border-radius: 8px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000; /* Asegura que el tooltip esté por encima de otros elementos */
  }
`;

const StyledCalendar = styled(Calendar)`
  border: 1px solid #ddd; /* Borde claro */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra */
`;

export default MyCalendar;