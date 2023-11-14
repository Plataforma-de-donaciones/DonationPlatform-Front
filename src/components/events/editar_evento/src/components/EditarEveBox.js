import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import TituloLine from "./TituloLine";
import NombreEveEdicionBox from "./NombreEveEdicionBox";
import DescripcionEveEditarBox from "./DescripcionEveEditarBox";
import LocalidadBox from "./LocalidadBox";
import ImagenEveEditarBox from "./ImagenEveEditarBox";
import AceptarButton from "./AceptarButton";
import CancelarButton from "./CancelarButton";
import { useParams } from "react-router-dom";
import DateTimePicker from "./DatePicker";
import DateTimePickerFinal from "./DatePickerFinal";

const cookies = new Cookies();

const Container = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 1);
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 15px;
  margin-bottom: 100px;
  min-height: 70vh;
  align-items: center;
  justify-content: center;
`;

const Rect = styled.div`
  width: 100%;
  background-color: rgba(255, 152, 0, 0.6);
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  padding: 6px 0px 0px 0px;
  text-align: center;
`;

const TitleText = styled.span`
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  text-align: center;
  margin-top: 6px;
`;

const MaterialButtonViolet2Row = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
`;

const EditarEveBox = (props) => {
  const [datosEvento, setDatosEvento] = useState({});
  const [eventName, setEveName] = useState("");
  const [eventDescription, setEveDescription] = useState("");
  const [eventType, setEveType] = useState("");
  const [eventZone, setEveZone] = useState("");
  const [eventAttachment, setEveAttachment] = useState("");
  const token = cookies.get("token");
  const [file, setFile] = useState(null);
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");

  const { event_id } = useParams();
  console.log(event_id);

  useEffect(() => {
    const cargarDatosEvento = async () => {
      try {
        const response = await instance.post(
          "/events/searchbyid/",
          { event_id: event_id },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const evento = response.data[0];
        setDatosEvento(evento);
        setEveName(evento.event_name);
        setEveDescription(evento.event_description);
        setEveType(evento.type);
        setEveZone(evento.zone);
        setEveAttachment(evento.attachments);
        setEventStartDate(evento.start_date);
        setEventEndDate(evento.end_date);
      } catch (error) {
        console.error("Error al cargar datos de la evento:", error);
      }
    };

    if (event_id) {
      cargarDatosEvento();
    }
  }, [event_id, token]);

  const handleEveNameChange = (e) => {
    setEveName(e.target.value);
  };

  const handleEveDescriptionChange = (e) => {
    setEveDescription(e.target.value);
  };

  const handleEveZoneChange = (e) => {
    if (e && e.target && e.target.value) {
      setEveZone(e.target.value);
    }
  };

  const handleEveAttachmentChange = (e) => {
    setEveAttachment(e.target.value);
  };

  const setEveZoneValue = (newEveZone) => {
    setEveZone(newEveZone);
  };

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    setEveAttachment("");
  };
  
  const handleStartDateChange = (date) => {
    setEventStartDate(date.toISOString());
  };

  const handleEndDateChange = (date) => {
    setEventEndDate(date.toISOString());
  };

  const handleSubmit = async () => {
  try {
    const formData = new FormData();

    formData.append("event_name", eventName);
    formData.append("event_description", eventDescription);
    formData.append("type", eventType);
    formData.append("zone", eventZone);
    formData.append("start_date", eventStartDate);
    formData.append("end_date", eventEndDate);

    if (file) {
      formData.append("attachments", file);
      console.log("imagen:", file);
    }

    const response = await instance.patch(`/events/${event_id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    });

    console.log("Respuesta del servidor:", response.data);
    
  } catch (error) {
    console.error("Error al actualizar la información del evento:", error);
  }
};

  return (
    <Container {...props}>
      <Rect>
        <TitleText>Editar evento</TitleText>
      </Rect>
      <NombreEveEdicionBox
        style={{ width: "100%" }}
        value={eventName}
        onChange={handleEveNameChange}
      />
      <DescripcionEveEditarBox
        style={{ width: "100%" }}
        value={eventDescription}
        onChange={handleEveDescriptionChange}
      />
      <LocalidadBox
        style={{ width: "100%" }}
        eventZone={eventZone}
        onChange={handleEveZoneChange}
        setEveZone={setEveZoneValue}
      />
      <DateTimePicker
        value={eventStartDate}
        onChange={handleStartDateChange}
      />
      <DateTimePickerFinal
        value={eventEndDate}
        onChange={handleEndDateChange}
      />
      <ImagenEveEditarBox
        style={{ width: "100%" }}
        handleFileChange={handleFileChange}
        eveAttachment={eventAttachment}
      />
      <MaterialButtonViolet2Row>
        <AceptarButton
          style={{ width: "48%" }}
          onClick={handleSubmit}
        />
        <CancelarButton
          history={props.history}
          style={{ width: "48%", marginLeft: "4%" }}
        />
      </MaterialButtonViolet2Row>
    </Container>
  );
};

export default EditarEveBox;
