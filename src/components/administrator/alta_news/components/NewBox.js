import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TituloLine from "./TituloLine";
import NombreNewBox from "./NombreNewBox";
import DescripcionNewBox from "./DescripcionNewBox";
import TemaNewBox from "./TemaNewBox";
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

const NewBox = (props) => {
  const [newData, setNewData] = useState({
    new_name: "",
    new_description: "",
    new_subject: "",
    new_created_at: new Date().toISOString(),
    user: "",
    is_highlighted: false,
    views_count: 0,
    attachments: null,
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
    setNewData((prevData) => ({
      ...prevData,
      user: user_id || "",
    }));
  }, [user_id]);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleFieldChange = (fieldName, event) => {
    const value = event.target.value;

    setNewData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  const handleZoneSelect = (zoneId) => {
    setNewData((prevData) => ({
      ...prevData,
      zone: zoneId,
    }));
  };


  const validateField = (fieldName, value) => {
    if (fieldName === "new_name" && (!value || !value.toString().trim())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "El nombre no puede estar vacío",
      }));
    } else if (fieldName === "new_name" && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }
    if (fieldName === "new_description" && (!value || !value.toString().trim())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "La descripción no puede estar vacía",
      }));
    } else if (fieldName === "new_description" && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }

  };

  const handleAccept = async () => {
    Object.keys(newData).forEach((name) => {
      validateField(name, newData[name]);
    });

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    try {
      const formData = new FormData();
      if (file) {
        formData.append("attachments", file);
      }
      Object.entries(newData).forEach(([key, value]) => {
        if (key !== "attachments") {
          formData.append(key, value);
        }
      });
    const formDataEntries = [...formData.entries()];

      const response = await instance.post("/news/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data", 
        },
      });

      if (response.status === 201) {
        alert("Noticia registrada correctamente");
      } else {
        const serverError = response.data;
        console.log(response);
        if (serverError) {
        } else {
        }
      }
    } catch (error) {
      console.error("Error al registrar la noticia:", error);
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
        <LoremIpsum>Crear noticia</LoremIpsum>
      </UntitledComponent1Stack>
      <FormContainer>
        <NombreNewBox
          onChange={(event) => handleFieldChange("new_name", event)}
        />
        {errors.new_name && <span style={{ color: "red" }}>{errors.new_name}</span>}
        <DescripcionNewBox
          onChange={(event) => handleFieldChange("new_description", event)}
        />
        {errors.new_description && <span style={{ color: "red" }}>{errors.new_description}</span>}
        <TemaNewBox
          onChange={(event) => handleFieldChange("new_subject", event)}
        />
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

export default NewBox;
