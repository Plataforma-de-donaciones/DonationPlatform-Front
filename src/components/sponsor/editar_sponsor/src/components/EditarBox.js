import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import TituloLine from "./TituloLine";
import NombreEdicionBox from "./NombreEdicionBox";
import DescripcionEditarBox from "./DescripcionEditarBox";
import TipoDePublicacionEdicionBox from "./TipoDePublicacionEdicionBox";
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

const Sponsor = styled.span`
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

const EditarBox = (props) => {
  const [datosSponsor, setDatosSponsor] = useState({});
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorDescription, setSponsorDescription] = useState("");
  const [sponsorType, setSponsorType] = useState("");
  const [sponsorZone, setSponsorZone] = useState("");
  const token = cookies.get("token");

  const { sponsor_id } = useParams();
  console.log(sponsor_id);

  useEffect(() => {
    const cargarDatosSponsor = async () => {
      try {
        const response = await instance.post(
          "/sponsors/searchbyid/",
          { sponsor_id: sponsor_id },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const sponsor = response.data[0];
        setDatosSponsor(sponsor);
        setSponsorName(sponsor.sponsor_name);
        setSponsorDescription(sponsor.sponsor_description);
        setSponsorType(sponsor.type);
        setSponsorZone(sponsor.zone);
      } catch (error) {
        console.error("Error al cargar datos de la donacion:", error);
      }
    };

    if (sponsor_id) {
      cargarDatosSponsor();
    }
  }, [sponsor_id, token]);

  const handleSponsorNameChange = (e) => {
    setSponsorName(e.target.value);
  };

  const handleSponsorDescriptionChange = (e) => {
    setSponsorDescription(e.target.value);
  };

  const handleSponsorTypeChange = (selectedType) => {
    setSponsorType(selectedType);
  };

  const handleSponsorZoneChange = (e) => {
    if (e && e.target && e.target.value) {
      setSponsorZone(e.target.value);
    }
  };

  const setSponsorZoneValue = (newSponsorZone) => {
    setSponsorZone(newSponsorZone);
  };

  const handleSubmit = async () => {
    try {
      const response = await instance.patch(
        `/sponsors/${sponsor_id}/`,
        {
          sponsor_name: sponsorName,
          sponsor_description: sponsorDescription,
          type: sponsorType,
          zone: sponsorZone,
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
        <TitleText>Editar padrino</TitleText>
      </Rect>
        <NombreEdicionBox
          style={{ width: "100%" }}
          value={sponsorName}
          onChange={handleSponsorNameChange}
        />
      </UntitledComponent1Stack>
      <DescripcionEditarBox
        style={{ width: "100%" }}
        value={sponsorDescription}
        onChange={handleSponsorDescriptionChange}
      />
      <TipoDePublicacionEdicionBox
        style={{ width: "100%" }}
        selectedType={sponsorType}
        onChange={handleSponsorTypeChange}
      />
      <LocalidadBox style={{ width: "100%" }} sponsorZone={sponsorZone} onChange={handleSponsorZoneChange} setEqZone={setSponsorZoneValue}/>
      <MaterialButtonViolet2Row>
        <AceptarButton style={{ width: "48%" }} onClick={handleSubmit} />
        <CancelarButton history={props.history} style={{ width: "48%", marginLeft: "4%" }} />
      </MaterialButtonViolet2Row>
    </Container>
  );
};

export default EditarBox;