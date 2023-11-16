import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import TituloLine from "./TituloLine";
import NombreEqMedicoEdicionBox from "./NombreEqMedicoEdicionBox";
import DescripcionEqMedicoEditarBox from "./DescripcionEqMedicoEditarBox";
import TipoDePublicacionEqMedicoEdicionBox from "./TipoDePublicacionEqMedicoEdicionBox";
import LocalidadBox from "./LocalidadBox";
import ImagenEqMEdicoEditarBox from "./ImagenEqMEdicoEditarBox";
import AceptarButton from "./AceptarButton";
import CancelarButton from "./CancelarButton";
import { useParams } from "react-router-dom";

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

const EquipamientoMedico = styled.span`
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  margin-top: 5px;
`;

const UntitledComponent1Stack = styled.div`
  width: 100%;
  height: auto;
  margin-top: 15px;
  position: relative;
`;

const MaterialButtonViolet2Row = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
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

const EditarEqMedicoBox = (props) => {
  const [datosEquipamiento, setDatosEquipamiento] = useState({});
  const [eqName, setEqName] = useState("");
  const [eqDescription, setEqDescription] = useState("");
  const [eqType, setEqType] = useState("");
  const [eqZone, setEqZone] = useState("");
  const [eqAttachment, setEqAttachment] = useState("");
  const token = cookies.get("token");
  const [file, setFile] = useState(null);
  console.log(eqAttachment);

  const { eq_id } = useParams();
  console.log(eq_id);

  useEffect(() => {
    const cargarDatosEquipamiento = async () => {
      try {
        const response = await instance.post(
          "/medicalequipments/searchbyid/",
          { eq_id: eq_id },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const equipamiento = response.data[0];
        setDatosEquipamiento(equipamiento);
        setEqName(equipamiento.eq_name);
        console.log(equipamiento.eq_name);
        setEqDescription(equipamiento.eq_description);
        setEqType(equipamiento.type);
        setEqZone(equipamiento.zone);
        console.log(equipamiento.zone);
        setEqAttachment(equipamiento.eq_attachment);
      } catch (error) {
        console.error("Error al cargar datos del equipamiento:", error);
      }
    };

    if (eq_id) {
      cargarDatosEquipamiento();
    }
  }, [eq_id, token]);

  const handleEqNameChange = (e) => {
    setEqName(e.target.value);
  };

  const handleEqDescriptionChange = (e) => {
    setEqDescription(e.target.value);
  };

  const handleEqTypeChange = (selectedType) => {
    setEqType(selectedType);
  };

  const handleEqZoneChange = (e) => {
    if (e && e.target && e.target.value) {
      setEqZone(e.target.value);
    }
  };

  const handleEqAttachmentChange = (e) => {
    setEqAttachment(e.target.value);
  };

  const setEqZoneValue = (newEqZone) => {
    setEqZone(newEqZone);
  };

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    setEqAttachment("");
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
  
      // Agregar nuevos datos y archivo solo si es diferente al actual
      if (file && file.name !== eqAttachment) {
        formData.append("eq_attachment", file);
      }
  
      Object.entries({
        eq_name: eqName,
        eq_description: eqDescription,
        type: eqType,
        zone: eqZone,
      }).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      const response = await instance.patch(`/medicalequipments/${eq_id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
  
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al actualizar la información del equipamiento:", error);
    }
  };
  
  

  return (
    <Container {...props}>
      <UntitledComponent1Stack>
      <Rect>
        <TitleText>Editar equipamiento</TitleText>
      </Rect>
        <NombreEqMedicoEdicionBox
          style={{ width: "100%" }}
          value={eqName}
          onChange={handleEqNameChange}
        />
      </UntitledComponent1Stack>
      <DescripcionEqMedicoEditarBox
        style={{ width: "100%" }}
        value={eqDescription}
        onChange={handleEqDescriptionChange}
      />
      <TipoDePublicacionEqMedicoEdicionBox
        style={{ width: "100%" }}
        selectedType={eqType}
        onChange={handleEqTypeChange}
      />
      <LocalidadBox style={{ width: "100%" }} eqZone={eqZone} onChange={handleEqZoneChange} setEqZone={setEqZoneValue}/>
      {eqAttachment && <img src={`https://plataformadonaciones-qa.azurewebsites.net${eqAttachment}`} alt="Equipamiento" style={{ maxWidth: "100%", marginTop: "10px" }} />}
      <ImagenEqMEdicoEditarBox
        style={{ width: "100%" }}
        handleFileChange={handleFileChange}
        eqAttachment={eqAttachment}
      />
      <MaterialButtonViolet2Row>
        <AceptarButton style={{ width: "48%" }} onClick={handleSubmit} />
        <CancelarButton history={props.history} style={{ width: "48%", marginLeft: "4%" }} />
      </MaterialButtonViolet2Row>
    </Container>
  );
};

export default EditarEqMedicoBox;