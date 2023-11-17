import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import NombreDonEdicionBox from "./NombreDonEdicionBox";
import DescripcionDonEditarBox from "./DescripcionDonEditarBox";
import LocalidadBox from "./LocalidadBox";
import ImagenDonEditarBox from "./ImagenDonEditarBox";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import TipodePublicacionBox from "./../../../../volunteer/alta_voluntario/components/TipodePublicacionBox";
import { urlBackendDev } from "../../../../generales/variables/constantes";
import Spinner from "react-bootstrap/Spinner";
import CardComponente from "../../../../generales/card/CardComponente";

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
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [imagenCargando, setImagenCargando] = useState(true);

  const { don_id } = useParams();

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
        setImagenCargando(false);
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
    console.log(donZone);
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
        let donAttachmentToSend = donAttachment;

        if (file) {
          const formData = new FormData();
          formData.append("don_attachment", file);

          const response = await instance.patch(
            `/donations/${don_id}/`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${token}`,
              },
            }
          );

          donAttachmentToSend = response.data.filePath;
        }

        const response = await instance.patch(
          `/donations/${don_id}/`,
          {
            don_name: donName,
            don_description: donDescription,
            type: donType,
            zone: donZone,
            don_attachment: donAttachmentToSend,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        Swal.fire({
          title: "Editado correctamente!",
          text: "Los datos han sido editados",
          icon: "success",
        });
        history.push("/listadoofrecimientos");
        console.log("Respuesta del servidor:", response.data);
      } catch (error) {
        console.error(
          "Error al actualizar la información de la donación:",
          error
        );
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
        history.push("/listadoofrecimientos");
      }
    });
  };

  return (
    <>
      <CardComponente
        titulo={"Editar donaciones"}
        body={
          <>
            <NombreDonEdicionBox
              style={{ width: "100%" }}
              value={donName}
              onChange={handleDonNameChange}
            />

            <DescripcionDonEditarBox
              style={{ width: "100%" }}
              value={donDescription}
              onChange={handleDonDescriptionChange}
            />

            <TipodePublicacionBox defaultValue={donType}></TipodePublicacionBox>

            <LocalidadBox donZone={donZone} onChange={setDonZone} />

            <div className="text-center">
              {imagenCargando ? (
                <Spinner variant="success" animation="border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
              ) : (
                <ImagenDonEditarBox
                  className="text-center"
                  style={{ width: "20%" }}
                  handleFileChange={handleFileChange}
                  imagen={urlBackendDev + donAttachment}
                  descripcion={donDescription}
                  titulo={"Imagen"}
                />
              )}
            </div>

            <Row className="text-center">
              <Col>
                <Button style={{ width: "38%" }} onClick={handleSubmit}>
                  Aceptar
                </Button>
              </Col>

              <Col>
                <Button
                  history={props.history}
                  style={{ width: "38%", marginLeft: "4%" }}
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

export default EditarDonBox;
