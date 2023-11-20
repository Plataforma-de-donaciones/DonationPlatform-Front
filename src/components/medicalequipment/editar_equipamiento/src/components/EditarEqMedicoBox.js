import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import CardComponente from "../../../../generales/card/CardComponente";
import DescripcionDonEditarBox from "../../../../donation/editar_donacion/src/components/DescripcionDonEditarBox";
import TipodePublicacionBox from "../../../../volunteer/alta_voluntario/components/TipodePublicacionBox";
import LocalidadBox from "../../../../donation/editar_donacion/src/components/LocalidadBox";
import ImagenDonEditarBox from "../../../../donation/editar_donacion/src/components/ImagenDonEditarBox";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { urlBackendDev } from "../../../../generales/variables/constantes";
import NombreDonEdicionBox from "../../../../donation/editar_donacion/src/components/NombreDonEdicionBox";

const cookies = new Cookies();


const EditarEqMedicoBox = (props) => {
  const [datosEquipamiento, setDatosEquipamiento] = useState({});
  const [eqName, setEqName] = useState("");
  const [eqDescription, setEqDescription] = useState("");
  const [eqType, setEqType] = useState("");
  const [eqZone, setEqZone] = useState("");
  const [eqAttachment, setEqAttachment] = useState("");
  const token = cookies.get("token");
  const [file, setFile] = useState(null);
  const history = useHistory();
  const [imagenCargando, setImagenCargando] = useState(true);
  const [validated, setValidated] = useState(false);

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
        setImagenCargando(false);
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

        const response = await instance.patch(
          `/medicalequipments/${eq_id}/`,
          formData,
          {
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
        history.push("/listadoofrecimientos");
        console.log("Respuesta del servidor:", response.data);
      } catch (error) {
        console.error(
          "Error al actualizar la información del equipamiento:",
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

  //url: editarequipamiento/102

  return (
    <>
      <CardComponente
        titulo={"Editar donaciones"}
        body={
          <>
            <NombreDonEdicionBox
              style={{ width: "100%" }}
              value={eqName}
              onChange={handleEqNameChange}
            />

            <DescripcionDonEditarBox
              style={{ width: "100%" }}
              value={eqDescription}
              onChange={handleEqDescriptionChange}
            />

            <TipodePublicacionBox defaultValue={eqType}></TipodePublicacionBox>

            <LocalidadBox donZone={eqZone} onChange={setEqZone} />

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
                  imagen={urlBackendDev + eqAttachment}
                  descripcion={eqDescription}
                  titulo={"Imagen"}
                  eqAttachment={eqAttachment}
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
            <div className="text-center mx-auto"></div>
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

export default EditarEqMedicoBox;
