import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const EventMarker = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  background-color: rgba(79, 181, 139, 1);
  border-radius: 50%;
  cursor: pointer;
`;

const StyledCalendar = styled(Calendar)`
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const MyCalendar = ({ events, setEventList, isHome }) => {
  const history = useHistory();

  const openEventToast = (eventName) => {
    Swal.fire({
      title: eventMessage(eventName),
      icon: "info",
      html: "¿Desea leer más información del evento?",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      position: "bottom-end",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        {
          setEventList &&
            setEventList([
              events.find((evento) => evento.event_name == eventName),
            ]);
        }
        {
          isHome && history.push("/listadoeventos");
        }
      }
    });
  };

  const eventMessage = (eventName) => {
    return `Evento: ${eventName}`;
  };

  return (
    <>
      <ToastContainer />
      <StyledCalendar
        className={"mx-auto"}
        tileContent={({ date }) => {
          const formattedDate = formatDate(date);
          const matchingEvent = events.find(
            (event) => formatDate(new Date(event.start_date)) === formattedDate
          );
          return matchingEvent ? (
            <EventMarker
              onClick={() => openEventToast(matchingEvent.event_name)}
            />
          ) : null;
        }}
      />
    </>
  );
};

export default MyCalendar;
