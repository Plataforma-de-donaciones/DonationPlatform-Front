import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import '../../../../generales/src/assets/estilos.css'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NombreEveEdicionBox from "./NombreEveEdicionBox";
import DescripcionEveEditarBox from "./DescripcionEveEditarBox";
import { useParams, useHistory } from "react-router-dom";
import DateTimePicker from "./DatePicker";
import DateTimePickerFinal from "./DatePickerFinal";
import CardComponente from "./../../../../generales/card/CardComponente";
import Swal from "sweetalert2";
import LocalidadBox from "../../../../generales/src/components/LocalidadBoxEditar";
import {Button, Card, CardHeader, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import ImagenDonEditarBox from "../../../../generales/src/components/ImagenDonEditarBox";
import { urlBackendDev } from "../../../../generales/variables/constantes";
import { useAuth } from "../../../../../AuthContext";
import Spinner from "react-bootstrap/Spinner";

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

const MaterialButtonViolet2Row = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
`;

const EditarEveBox = (props) => {
  const [datosEvento, setDatosEvento] = useState({});
  const [eventName, setEveName] = useState("");
  const [eventDescription, setEveDescription] = useState("");
  const [eventType, setEveType] = useState("");
  const [eventZone, setEveZone] = useState("");
  const [eventAttachment, setEveAttachment] = useState("");
  const token = cookies.get("token");
  const [file, setFile] = useState(null);
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  //const { event_id } = useParams();
  const [imagenCargando, setImagenCargando] = useState(true);

  const { itemId, setItemId } = useAuth();
  console.log(itemId);

  useEffect(() => {
    const cargarDatosEvento = async () => {
      try {
        const response = await instance.post(
          "/events/searchbyid/",
          { event_id: itemId },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const evento = response.data[0];
        setDatosEvento(evento);
        setEveName(evento.event_name);
        setEveDescription(evento.event_description);
        setEveType(evento.type);
        setEveZone(evento.zone);
        setEveAttachment(evento.attachments);
        setEventStartDate(evento.start_date);
        setEventEndDate(evento.end_date);
        setImagenCargando(false);
      } catch (error) {
        console.error("Error al cargar datos de la evento:", error);
      }
    };

    if (itemId) {
      cargarDatosEvento();
    }
  }, [itemId, token]);

  const handleEveNameChange = (e) => {
    setEveName(e.target.value);
  };

  const handleEveDescriptionChange = (e) => {
    setEveDescription(e.target.value);
  };

  const handleEveZoneChange = (e) => {
    if (e && e.target && e.target.value) {
      setEveZone(e.target.value);
    }
  };

  const handleEveAttachmentChange = (e) => {
    setEveAttachment(e.target.value);
  };

  const setEveZoneValue = (newEveZone) => {
    setEveZone(newEveZone);
  };

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    setEveAttachment("");
  };

  const handleStartDateChange = (date) => {
    setEventStartDate(date.toISOString());
  };

  const handleEndDateChange = (date) => {
    setEventEndDate(date.toISOString());
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

        formData.append("event_name", eventName);
        formData.append("event_description", eventDescription);
        formData.append("type", eventType);
        formData.append("zone", eventZone);
        formData.append("start_date", eventStartDate);
        formData.append("end_date", eventEndDate);

        if (file && file.name !== eventAttachment) {
          formData.append("attachments", file);
        }

        if (file) {
          formData.append("attachments", file);
          console.log("imagen:", file);
        }

        const response = await instance.patch(
          `/events/${itemId}/`,
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
        console.error("Error al actualizar la información del evento:", error);
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
        <Card.Header className="text-center h5">Edita el evento</Card.Header>
        <Card.Body>
          <Form validated={validated} onSubmit={handleSubmit}>
            <NombreEveEdicionBox
              style={{ width: "100%" }}
              value={eventName}
              onChange={handleEveNameChange}
            />

            <DescripcionEveEditarBox
              style={{ width: "100%" }}
              value={eventDescription}
              onChange={handleEveDescriptionChange}
            />

            <LocalidadBox eveZone={eventZone} onChange={setEveZone} />
           

            <DateTimePicker
              value={eventStartDate}
              onChange={handleStartDateChange}
            />
            <DateTimePickerFinal
              value={eventEndDate}
              onChange={handleEndDateChange}
            />

<           div className="mb-3 d-flex justify-content-center align-items-center">
              {imagenCargando ? (
                <Spinner variant="success" animation="border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
              ) : (
        
                <ImagenDonEditarBox
                  className="text-center"
                  style={{ width: "20%" }}
                  handleFileChange={handleFileChange}
                  imagen={urlBackendDev + eventAttachment}
                  descripcion={eventDescription}
                  titulo={"Imagen"}
                  eventAttachment={eventAttachment}
                />
              )}
            </div>

            <div className="d-flex justify-content-center gap-4">
              
              <Button variant="primary"  onClick={handleSubmit} className="btn-primary-forms">
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
export default EditarEveBox;
