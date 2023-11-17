import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TituloLine from "./TituloLine";
import NombreEveBox from "./NombreEveBox";
import DescripcionEveBox from "./DescripcionEveBox";
import LocalidadBox from "./LocalidadBox";
import SubirArchivoBox from "./SubirArchivoBox";
import AceptarButton from "./AceptarButton";
import CancelarButton from "./CancelarButton";
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";
import DateTimePicker from "./DatePicker";
import DateTimePickerFinal from "./DatePickerFinal";

const Container = styled.div`
  background-color: rgba(255, 255, 255, 1);
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TitleContainer = styled.div`
  position: relative;
  background-color: rgba(255, 152, 0, 0.5);
`;

const Title = styled.h2`
  font-size: 20px;
  color: #121212;
  font-weight: 700;
  margin: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonSeparator = styled.div`
  width: 10px; /* Espacio entre los botones */
`;

const LoremIpsum = styled.span`
  left: 53px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  font-size: 20px;
  top: 5px;
`;

const UntitledComponent1Stack = styled.div`
  width: 400px;
  height: 35px;
  margin-top: 15px;
  position: relative;
`;

const cookies = new Cookies();

const EventoBox = (props) => {
  const [eventData, setEventData] = useState({
    event_name: "",
    event_description: "",
    type: 2,
    state: 1,
    event_date: new Date().toISOString(),
    user: "", 
    zone: null,
    geom_point: null,
    attachments: null,
    start_date: null,
    end_date: null,
  });

  const [errors, setErrors] = useState({});
  const token = cookies.get("token");
  const [user_id, setUserId] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const userDataCookie = cookies.get("user_data");
    if (userDataCookie) {
      setUserId(userDataCookie.user_id);
    }
  }, []);

  useEffect(() => {
    setEventData((prevData) => ({
      ...prevData,
      user: user_id || "",
    }));
  }, [user_id]);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleFieldChange = (fieldName, value) => {
    const fieldValue = typeof value === 'object' ? value.target.value : value;
    setEventData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue && fieldValue._isValid ? fieldValue.toISOString() : fieldValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  const handleZoneSelect = (zoneId) => {
    setEventData((prevData) => ({
      ...prevData,
      zone: zoneId,
    }));
  };


  const validateField = (fieldName, value) => {
    if (fieldName === "event_name" && (!value || !value.toString().trim())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "El nombre no puede estar vacío",
      }));
    }else if (fieldName === "event_name" && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }
    if (fieldName === "start_date" && !value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "Debe seleccionar una fecha de inicio",
      }));
    } else if (fieldName === "start_date" && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }
    
  };

  const handleAccept = async () => {
    Object.keys(eventData).forEach((name) => {
      validateField(name, eventData[name]);
    });
    if (!eventData.start_date) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        start_date: "Debe seleccionar una fecha de inicio",
      }));
    }

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    try {
      const formData = new FormData();
      if (file) {
        formData.append("attachments", file);
      }
      Object.entries(eventData).forEach(([key, value]) => {
        if (key !== "attachments") {
          formData.append(key, value);
        }
      });
      console.log("Contenido de FormData:");
    const formDataEntries = [...formData.entries()];
    console.log(formDataEntries);

      const response = await instance.post("/events/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data", 
        },
      });

      if (response.status === 201) {
        alert("Evento registrado correctamente");
      } else {
        const serverError = response.data;
        console.log(response);
        if (serverError) {
        } else {
        }
      }
    } catch (error) {
      console.error("Error al registrar equipo médico:", error);
      console.log("Respuesta del servidor:", error.response); 
    }
  };

  return (
    <Container {...props}>
      <UntitledComponent1Stack>
        <TituloLine
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 35,
            width: 400,
            backgroundColor: "rgba(255,152,0,1)",
            opacity: 0.5
          }}
        ></TituloLine>
        <LoremIpsum>Registra tu Evento</LoremIpsum>
      </UntitledComponent1Stack>
      <FormContainer>
        <NombreEveBox
          onChange={(event) => handleFieldChange("event_name", event)}
        />
        {errors.event_name && <span style={{ color: "red" }}>{errors.event_name}</span>}
        <DescripcionEveBox
          onChange={(event) => handleFieldChange("event_description", event)}
        />
        <DateTimePicker
          value={eventData.start_date}
          onChange={(date) => handleFieldChange('start_date', date)}
        />
        <DateTimePickerFinal
          selectedDate={eventData.end_date}
          onChange={(date) => handleFieldChange("end_date", date)}
        />
        <LocalidadBox onSelect={handleZoneSelect} />
        <SubirArchivoBox onChangeFile={(file) => handleFileChange(file)} />
              </FormContainer>
      <ButtonContainer>
        <AceptarButton onClick={handleAccept} />
        <ButtonSeparator />
        <CancelarButton />
      </ButtonContainer>
    </Container>
  );
};

export default EventoBox;
