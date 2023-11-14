import React from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";

const EventMarker = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  cursor: default;


  &:hover::after {
    content: "${props => props.eventName}";
    position: fixed; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
  }
`;
const StyledCalendar = styled(Calendar)`
  border: 1px solid #ddd;
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const MyCalendar = ({ eventList }) => {
  return (
    <StyledCalendar
      tileContent={({ date }) => {
        const formattedDate = formatDate(date);

        if (!eventList || eventList.length === 0) {
          return null;
        }

        const matchingEvent = eventList.find(
          (evento) => formatDate(new Date(evento.start_date)) === formattedDate
        );

        return matchingEvent ? <EventMarker eventName={matchingEvent.event_name} /> : null;
      }}
    />
  );
};

export default MyCalendar;
