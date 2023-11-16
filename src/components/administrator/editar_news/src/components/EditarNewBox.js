import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import TituloLine from "./TituloLine";
import NombreNewEdicionBox from "./NombreNewEdicionBox";
import DescripcionNewEditarBox from "./DescripcionNewEditarBox";
import ImagenNewEditarBox from "./ImagenNewEditarBox";
import AceptarButton from "./AceptarButton";
import CancelarButton from "./CancelarButton";
import { useParams } from "react-router-dom";
import TemaNewEdicionBox from "./TemaNewEdicionBox";

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

const Noticia = styled.span`
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

const EditarNewBox = (props) => {
  const [datosNoticia, setDatosNoticia] = useState({});
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newAttachment, setNewAttachment] = useState("");
  const token = cookies.get("token");
  const [file, setFile] = useState(null);

  const { new_id } = useParams();
  console.log(new_id);

  useEffect(() => {
    const cargarDatosNoticia = async () => {
      try {
        const response = await instance.post(
          "/news/searchbyid/",
          { new_id: new_id },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const noticia = response.data[0];
        setDatosNoticia(noticia);
        setNewName(noticia.new_name);
        setNewDescription(noticia.new_description);
        setNewSubject(noticia.new_subject);
        setNewAttachment(noticia.attachments);
      } catch (error) {
        console.error("Error al cargar datos de la noticia:", error);
      }
    };

    if (new_id) {
      cargarDatosNoticia();
    }
  }, [new_id, token]);

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNewDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleNewSubjectChange = (e) => {
    setNewSubject(e.target.value);
  };

  const handleNewAttachmentChange = (e) => {
    setNewAttachment(e.target.value);
  };

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
  
      if (file && file.name !== newAttachment) {
        formData.append("attachments", file);
      }
  
      Object.entries({
        new_name: newName,
        new_description: newDescription,
        new_subject: newSubject,
      }).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      const response = await instance.patch(`/news/${new_id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
  
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al actualizar la información de la noticia:", error);
    }
  };

  return (
    <Container {...props}>
      <UntitledComponent1Stack>
        <Rect>
          <TitleText>Editar noticia</TitleText>
        </Rect>
        <NombreNewEdicionBox
          style={{ width: "100%" }}
          value={newName}
          onChange={handleNewNameChange}
        />
      </UntitledComponent1Stack>
      <DescripcionNewEditarBox
        style={{ width: "100%" }}
        value={newDescription}
        onChange={handleNewDescriptionChange}
      />
      <TemaNewEdicionBox
        style={{ width: "100%" }}
        value={newSubject}
        onChange={handleNewSubjectChange}
      />
      {newAttachment && <img src={`https://plataformadonaciones-qa.azurewebsites.net${newAttachment}`} alt="Noticia" style={{ maxWidth: "100%", marginTop: "10px" }} />}
      <ImagenNewEditarBox
        style={{ width: "100%" }}
        handleFileChange={handleFileChange}
        newAttachment={newAttachment}
      />
      <MaterialButtonViolet2Row>
        <AceptarButton style={{ width: "48%" }} onClick={handleSubmit} />
        <CancelarButton history={props.history} style={{ width: "48%", marginLeft: "4%" }} />
      </MaterialButtonViolet2Row>
    </Container>
  );
};

export default EditarNewBox;
