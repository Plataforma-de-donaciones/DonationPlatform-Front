import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import '../../../../generales/src/assets/estilos.css'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NombreDonEdicionBox from "../../../../generales/src/components/NombreDonEdicionBox";
import DescripcionDonEditarBox from "../../../../generales/src/components/DescripcionDonEditarBox";
import LocalidadBox from "../../../../generales/src/components/LocalidadBoxEditar";
import ImagenDonEditarBox from "../../../../generales/src/components/ImagenDonEditarBox";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import {Button, Card, CardHeader, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import TipodePublicacionBox from "../../../../generales/src/components/TipodePublicacionBox";
import { urlBackendDev } from "../../../../generales/variables/constantes";
import Spinner from "react-bootstrap/Spinner";
import CardComponente from "../../../../generales/card/CardComponente";
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


  const { itemId, setItemId } = useAuth();
  console.log(itemId);

  useEffect(() => {
    const cargarDatosDonacion = async () => {
      try {
        const response = await instance.post(
          "/donations/searchbyid/",
          { don_id: itemId },
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

    if (itemId) {
      cargarDatosDonacion();
    }
  }, [itemId, token]);

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
      text: "Cambiarán los campos que ha editado",
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

        const response = await instance.patch(
          `/donations/${itemId}/`,
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
      <main>
    <Row1 className="mt-4">
    <Col1>
      <CardStyled className="card-alta">
        <Card.Header className="text-center h5">Edita la donación</Card.Header>
        <Card.Body>
          <Form validated={validated} onSubmit={handleSubmit}>
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

            <div className="mb-3 d-flex justify-content-center align-items-center">
              {imagenCargando ? (
                <Spinner variant="success" animation="border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
              ) : (
                <ImagenDonEditarBox
                  handleFileChange={handleFileChange}
                  imagen={urlBackendDev + donAttachment}
                  descripcion={donDescription}
                  titulo={"Imagen"}
                  eqAttachment={donAttachment}
                />
              )}
            </div>

            <div className="d-flex justify-content-center gap-4">
            <Button variant="primary" type="submit" className="btn-primary-forms">
                    Aceptar
              </Button>
              <Button history={props.history} onClick={handleCancel} variant="secondary">
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

export default EditarDonBox;
