import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import '../../../../generales/src/assets/estilos.css'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import CardComponente from "../../../../generales/card/CardComponente";
import DescripcionDonEditarBox from "../../../../generales/src/components/DescripcionDonEditarBox";
import TipodePublicacionBox from "../../../../generales/src/components/TipodePublicacionBox";
import LocalidadBox from "../../../../generales/src/components/LocalidadBoxEditar";
import ImagenDonEditarBox from "../../../../generales/src/components/ImagenDonEditarBox";
import {Button, Card, CardHeader, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { urlBackendDev } from "../../../../generales/variables/constantes";
import NombreDonEdicionBox from "../../../../generales/src/components/NombreDonEdicionBox";
import { useAuth } from "../../../../../AuthContext";

const cookies = new Cookies();

const HelperText = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
  font-style: normal;
  font-weight: 400;
`;

const Row1 = styled(Row)`
  margin-bottom: 30px;
`;

const Col1 = styled(Col)`
  margin-bottom: 30px;
`;

const CardStyled = styled(Card)`
  margin-bottom: 30px; /* Ajusta el valor según la separación deseada */

  &.card-alta {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    border: 1px solid #ddd;
    width: 500px;
  }
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
  const history = useHistory();
  const [imagenCargando, setImagenCargando] = useState(true);
  const [validated, setValidated] = useState(false);

  //const { eq_id } = useParams();
  
  const { itemId, setItemId } = useAuth();
  console.log(itemId);

  useEffect(() => {
    const cargarDatosEquipamiento = async () => {
      try {
        const response = await instance.post(
          "/medicalequipments/searchbyid/",
          { eq_id: itemId },
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

    if (itemId) {
      cargarDatosEquipamiento();
    }
  }, [itemId, token]);

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
          `/medicalequipments/${itemId}/`,
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
    <main>
    <Row1 className="mt-4">
    <Col1>
      <CardStyled className="card-alta">
        <Card.Header className="text-center h5">Edita el equipamiento médico</Card.Header>
        <Card.Body>
          <Form validated={validated} onSubmit={handleSubmit}>
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

            <div className="mb-3 d-flex justify-content-center align-items-center">
              {imagenCargando ? (
                <Spinner variant="success" animation="border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
              ) : (
                <ImagenDonEditarBox
                  handleFileChange={handleFileChange}
                  imagen={urlBackendDev + eqAttachment}
                  descripcion={eqDescription}
                  titulo={"Imagen"}
                  eqAttachment={eqAttachment}
                />
              )}
            </div>

            <div className="d-flex justify-content-center gap-4">
                <Button style={{ width: "38%" }} onClick={handleSubmit} className="btn-primary-forms">
                  Aceptar
                </Button>
                <Button
                  history={props.history}
                  onClick={handleCancel}
                  variant="secondary"
                >
                  Volver
                </Button>
                </div>
            </Form>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </Card.Body>
      </CardStyled>
    </Col1>
    </Row1>
    </main>
    );
};


export default EditarEqMedicoBox;
