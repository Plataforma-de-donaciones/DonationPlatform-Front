import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
//import TituloLine from "./TituloLine";
import NombreNewEdicionBox from "./NombreNewEdicionBox";
import DescripcionNewEditarBoxMod from "./DescripcionNewEditarBoxMod";
import ImagenNewEditarBox from "./ImagenNewEditarBox";
//import AceptarButton from "./AceptarButton";
//import CancelarButton from "./CancelarButton";
import { useParams } from "react-router-dom";
import TemaNewEdicionBox from "./TemaNewEdicionBox";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { urlBackendDev } from "../../../../generales/variables/constantes";
import Spinner from "react-bootstrap/Spinner";
import CardComponente from "../../../../generales/card/CardComponente";
import Swal from "sweetalert2";

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

const EditarNewBoxMod = (props) => {
  const [datosNoticia, setDatosNoticia] = useState({});
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newAttachment, setNewAttachment] = useState("");
  const token = cookies.get("token");
  const [file, setFile] = useState(null);
  const history = useHistory();
  const [imagenCargando, setImagenCargando] = useState(true);
  const [validated, setValidated] = useState(false);

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
        setImagenCargando(false);
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
    const confirmation = await Swal.fire({
      title: "¿Está seguro que desea editar?",
      text: "cambiarán los campos que ha editado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Cancelar",
    });
    if (confirmation.isConfirmed) {
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
        }
        );
        Swal.fire({
          title: "¡Editado correctamente!",
          text: "Los datos han sido editados",
          icon: "success",
        });
        history.push("/listadonoticias");
        console.log("Respuesta del servidor:", response.data);
      } catch (error) {
        console.error("Error al actualizar la información de la noticia:", error);
      }
    }
  };
  const handleCancel = () => {
    Swal.fire({
      title: "¿Está seguro que desea cancelar?",
      icon: "question",
      iconHtml: "?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/listadonoticiasmod");
      }
    });
  };

  return (


    <>
      <CardComponente
        titulo={"Editar noticias"}
        body={
          <>
            <NombreNewEdicionBox
              style={{ width: "100%" }}
              value={newName}
              onChange={handleNewNameChange}
            />

            <DescripcionNewEditarBoxMod
              style={{ width: "100%" }}
              value={newDescription}
              onChange={handleNewDescriptionChange}
            />

            <TemaNewEdicionBox
              style={{ width: "100%" }}
              value={newSubject}
              onChange={handleNewSubjectChange}
            />

            <div className="text-center mx-auto mb-3">
              {imagenCargando ? (
                <Spinner variant="success" animation="border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
              ) : (
                <ImagenNewEditarBox
                  className="text-center"
                  style={{ width: "20%" }}
                  handleFileChange={handleFileChange}
                  imagen={urlBackendDev + newAttachment}
                  descripcion={newDescription}
                  titulo={"Imagen"}
                  newAttachment={newAttachment}
                />
              )}
            </div>

            <Row className="text-center mx-auto">
              <Col className="col-6 col-sm-12 col-xl-6 col-md-12">
                <Button style={{ width: "50%" }} onClick={handleSubmit}>
                  Aceptar
                </Button>
              </Col>

              <Col className="col-6 col-sm-12 col-xl-6 col-md-12">
                <Button
                  history={props.history}
                  style={{ width: "50%", marginLeft: "4%" }}
                  onClick={handleCancel}
                  variant="secondary"
                >
                  Volver
                </Button>
              </Col>
            </Row>

            {/* Mover la pregunta de eliminar y el botón al final */}

            <Form validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3"></Row>
            </Form>
          </>
        }
      ></CardComponente>
    </>
  );
};

export default EditarNewBoxMod;
