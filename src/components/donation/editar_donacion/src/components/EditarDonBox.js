import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import TituloLine from "./TituloLine";
import NombreDonEdicionBox from "./NombreDonEdicionBox";
import DescripcionDonEditarBox from "./DescripcionDonEditarBox";
import TipoDePublicacionDonEdicionBox from "./TipoDePublicacionDonEdicionBox";
import LocalidadBox from "./LocalidadBox";
import ImagenDonEditarBox from "./ImagenDonEditarBox";
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

const Donacion = styled.span`
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

const EditarDonBox = (props) => {
  const [datosDonacion, setDatosDonacion] = useState({});
  const [donName, setDonName] = useState("");
  const [donDescription, setDonDescription] = useState("");
  const [donType, setDonType] = useState("");
  const [donZone, setDonZone] = useState("");
  const [donAttachment, setDonAttachment] = useState("");
  const token = cookies.get("token");
  const [file, setFile] = useState(null);

  const { don_id } = useParams();
  console.log(don_id);

  useEffect(() => {
    const cargarDatosDonacion = async () => {
      try {
        const response = await instance.post(
          "/donations/searchbyid/",
          { don_id: don_id },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const donacion = response.data[0];
        setDatosDonacion(donacion);
        setDonName(donacion.don_name);
        setDonDescription(donacion.don_description);
        setDonType(donacion.type);
        setDonZone(donacion.zone);
        setDonAttachment(donacion.don_attachment);
      } catch (error) {
        console.error("Error al cargar datos de la donación:", error);
      }
    };

    if (don_id) {
      cargarDatosDonacion();
    }
  }, [don_id, token]);

  const handleDonNameChange = (e) => {
    setDonName(e.target.value);
  };

  const handleDonDescriptionChange = (e) => {
    setDonDescription(e.target.value);
  };

  const handleDonTypeChange = (selectedType) => {
    setDonType(selectedType);
  };

  const handleDonZoneChange = (e) => {
    if (e && e.target && e.target.value) {
      setDonZone(e.target.value);
    }
  };

  const handleDonAttachmentChange = (e) => {
    setDonAttachment(e.target.value);
  };

  const setDonZoneValue = (newDonZone) => {
    setDonZone(newDonZone);
  };

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
  
      // Agregar nuevos datos y archivo solo si es diferente al actual
      if (file && file.name !== donAttachment) {
        formData.append("don_attachment", file);
      }
  
      Object.entries({
        don_name: donName,
        don_description: donDescription,
        type: donType,
        zone: donZone,
      }).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      const response = await instance.patch(`/donations/${don_id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
  
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al actualizar la información de la donación:", error);
    }
  };

  return (
    <Container {...props}>
      <UntitledComponent1Stack>
        <Rect>
          <TitleText>Editar donación</TitleText>
        </Rect>
        <NombreDonEdicionBox
          style={{ width: "100%" }}
          value={donName}
          onChange={handleDonNameChange}
        />
      </UntitledComponent1Stack>
      <DescripcionDonEditarBox
        style={{ width: "100%" }}
        value={donDescription}
        onChange={handleDonDescriptionChange}
      />
      <TipoDePublicacionDonEdicionBox
        style={{ width: "100%" }}
        selectedType={donType}
        onChange={handleDonTypeChange}
      />
      <LocalidadBox style={{ width: "100%" }} donZone={donZone} onChange={handleDonZoneChange} setEqZone={setDonZoneValue} />
      {donAttachment && <img src={donAttachment} alt="Donación" style={{ maxWidth: "100%", marginTop: "10px" }} />}
      <ImagenDonEditarBox
        style={{ width: "100%" }}
        handleFileChange={handleFileChange}
        eqAttachment={donAttachment}
      />
      <MaterialButtonViolet2Row>
        <AceptarButton style={{ width: "48%" }} onClick={handleSubmit} />
        <CancelarButton history={props.history} style={{ width: "48%", marginLeft: "4%" }} />
      </MaterialButtonViolet2Row>
    </Container>
  );
};

export default EditarDonBox;
