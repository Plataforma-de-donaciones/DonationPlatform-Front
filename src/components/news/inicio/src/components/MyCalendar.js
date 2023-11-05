import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const EventMarker = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  background-color: red;
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
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const MyCalendar = ({ events }) => {
  const openEventToast = (eventName) => {

    Swal.fire({
      title: eventMessage(eventName),
      icon: 'info',
      html:
        'Desea leer más info del evento?, ' +
        '<a href="WWW.google.com">links</a> ' + //link a todos los eventos?
        '',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      position: 'bottom-end',
      confirmButtonText:
        'Si', 
      cancelButtonText:
        'No',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login';
      }
    });

    // toast.info(eventMessage(eventName), {
    //   position: "bottom-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored",
    //   });
  };

  const eventMessage = (eventName) => {
    return `Evento: ${eventName}`;
  };

  return (
    <div>
      <ToastContainer />
      <StyledCalendar
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
    </div>
  );
};

export default MyCalendar;
