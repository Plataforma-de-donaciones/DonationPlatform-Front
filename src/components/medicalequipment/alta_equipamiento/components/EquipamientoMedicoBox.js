import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TituloLine from "./TituloLine";
import NombreEqMedicoBox from "./NombreEqMedicoBox";
import DescripcionEqBox from "./DescripcionEqBox";
import TipodePublicacionBox from "./TipodePublicacionBox";
import LocalidadBox from "./LocalidadBox";
import SubirArchivoBox from "./SubirArchivoBox";
import AceptarButton from "./AceptarButton";
import CancelarButton from "./CancelarButton";
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";

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

const EquipamientoMedicoBox = (props) => {
  const [equipmentData, setEquipmentData] = useState({
    eq_name: "",
    eq_description: "",
    type: "",
    state: 1,
    eq_created_at: new Date().toISOString(),
    user: "", 
    zone: null,
    geom_point: null,
    has_requests: false,
    request_count: 0,
    eq_attachment: null,
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
    setEquipmentData((prevData) => ({
      ...prevData,
      user: user_id || "", 
    }));
  }, [user_id]);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleFieldChange = (fieldName, event) => {
    const value = event.target.value;

    setEquipmentData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  const handleZoneSelect = (zoneId) => {
    setEquipmentData((prevData) => ({
      ...prevData,
      zone: zoneId,
    }));
  };

  const handleTipoPublicacionSelect = (selectedValue) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      type: "",
    }));
    setEquipmentData((prevData) => ({
      ...prevData,
      type: selectedValue,
    }));
  };

  const validateField = (fieldName, value) => {
    if (fieldName === "eq_name" && (!value || !value.toString().trim())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "El nombre no puede estar vacío",
      }));
    } else if (fieldName === "eq_name" && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }
  
    if (fieldName === "type" && !value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "Debe seleccionar un tipo de publicación",
      }));
    } else if (fieldName === "type" && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }
  
  };

  const handleAccept = async () => {
    Object.keys(equipmentData).forEach((name) => {
      validateField(name, equipmentData[name]);
    });
  
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }
  
    try {
      const formData = new FormData();
        if (file) {
        formData.append("eq_attachment", file);
      }
  
      Object.entries(equipmentData).forEach(([key, value]) => {
        if (key !== "eq_attachment") {
          formData.append(key, value);
        }
      });
  
      console.log("Contenido de FormData:");
      const formDataEntries = [...formData.entries()];
      console.log(formDataEntries);
  
      const response = await instance.post("/medicalequipments/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data", 
        },
      });
  
      if (response.status === 201) {
        alert("Equipo médico registrado correctamente");
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
        <LoremIpsum>Registra tu equipamiento médico</LoremIpsum>
      </UntitledComponent1Stack>
      <FormContainer>
        <NombreEqMedicoBox
          onChange={(event) => handleFieldChange("eq_name", event)}
        />
        {errors.eq_name && <span style={{ color: "red" }}>{errors.eq_name}</span>}
        <DescripcionEqBox
          onChange={(event) => handleFieldChange("eq_description", event)}
        />
        <TipodePublicacionBox onSelect={handleTipoPublicacionSelect} />
        {errors.type && <span style={{ color: "red" }}>{errors.type}</span>}
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

export default EquipamientoMedicoBox;
