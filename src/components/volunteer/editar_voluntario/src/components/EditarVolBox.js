import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import TituloLine from "./TituloLine";
import NombreVolEdicionBox from "./NombreVolEdicionBox";
import DescripcionVolEditarBox from "./DescripcionVolEditarBox";
import TipoDePublicacionVolEdicionBox from "./TipoDePublicacionVolEdicionBox";
import LocalidadBox from "./LocalidadBox";
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

const Voluntario = styled.span`
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

const EditarVolBox = (props) => {
  const [datosVoluntario, setDatosVoluntario] = useState({});
  const [volName, setVolName] = useState("");
  const [volDescription, setVolDescription] = useState("");
  const [volType, setVolType] = useState("");
  const [volZone, setVolZone] = useState("");
  const token = cookies.get("token");
  const [file, setFile] = useState(null);

  const { vol_id } = useParams();
  console.log(vol_id);

  useEffect(() => {
    const cargarDatosVoluntario = async () => {
      try {
        const response = await instance.post(
          "/volunteers/searchbyid/",
          { vol_id: vol_id },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const volunteer = response.data[0];
        setDatosVoluntario(volunteer);
        setVolName(volunteer.vol_name);
        setVolDescription(volunteer.vol_description);
        setVolType(volunteer.type);
        setVolZone(volunteer.zone);
      } catch (error) {
        console.error("Error al cargar datos de la donacion:", error);
      }
    };

    if (vol_id) {
      cargarDatosVoluntario();
    }
  }, [vol_id, token]);

  const handleVolNameChange = (e) => {
    setVolName(e.target.value);
  };

  const handleVolDescriptionChange = (e) => {
    setVolDescription(e.target.value);
  };

  const handleVolTypeChange = (selectedType) => {
    setVolType(selectedType);
  };

  const handleVolZoneChange = (e) => {
    if (e && e.target && e.target.value) {
      setVolZone(e.target.value);
    }
  };

  const setVolZoneValue = (newVolZone) => {
    setVolZone(newVolZone);
  };

  const handleSubmit = async () => {
    try {
      const response = await instance.patch(
        `/volunteers/${vol_id}/`,
        {
          vol_name: volName,
          vol_description: volDescription,
          type: volType,
          zone: volZone,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
  
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al actualizar la información de la donación:", error);
    }
  };

  return (
    <Container {...props}>
      <UntitledComponent1Stack>
      <Rect>
        <TitleText>Editar voluntariado</TitleText>
      </Rect>
        <NombreVolEdicionBox
          style={{ width: "100%" }}
          value={volName}
          onChange={handleVolNameChange}
        />
      </UntitledComponent1Stack>
      <DescripcionVolEditarBox
        style={{ width: "100%" }}
        value={volDescription}
        onChange={handleVolDescriptionChange}
      />
      <TipoDePublicacionVolEdicionBox
        style={{ width: "100%" }}
        selectedType={volType}
        onChange={handleVolTypeChange}
      />
      <LocalidadBox style={{ width: "100%" }} volZone={volZone} onChange={handleVolZoneChange} setEqZone={setVolZoneValue}/>
      <MaterialButtonViolet2Row>
        <AceptarButton style={{ width: "48%" }} onClick={handleSubmit} />
        <CancelarButton history={props.history} style={{ width: "48%", marginLeft: "4%" }} />
      </MaterialButtonViolet2Row>
    </Container>
  );
};

export default EditarVolBox;