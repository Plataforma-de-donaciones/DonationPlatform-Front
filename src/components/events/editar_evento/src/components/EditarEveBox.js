import { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import NombreEveEdicionBox from "./NombreEveEdicionBox";
import DescripcionEveEditarBox from "./DescripcionEveEditarBox";
import { useHistory, useLocation } from "react-router-dom";
import DateTimePicker from "./DatePicker";
import DateTimePickerFinal from "./DatePickerFinal";
import CardComponente from "./../../../../generales/card/CardComponente";
import Swal from "sweetalert2";
import LocalidadBox from "../../../../generales/src/components/LocalidadBoxEditar";
import { Row, Col, Button, Form, Spinner } from "react-bootstrap";
import ImagenDonEditarBox from "../../../../generales/src/components/ImagenDonEditarBox";
import { urlBackendDev } from "../../../../generales/variables/constantes";
import { useAuth } from "../../../../../AuthContext";


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
  const location = useLocation();
  const [rutaAnterior, setRutaAnterior] = useState(null);
 

  useEffect(() => {
    setRutaAnterior(location.state?.rutaAnterior);
    console.log(rutaAnterior);
    
  }, [location.search, history]);
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

          history.push(rutaAnterior);

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
        history.push(rutaAnterior);
      }
    });
  };

  //url:editarevento/id

  return (
    <>
      <CardComponente
        titulo={"Editar evento"}
        body={
          <>
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
                  imagen={urlBackendDev + eventAttachment}
                  descripcion={eventDescription}
                  titulo={"Imagen"}
                  eventAttachment={eventAttachment}
                />
              )}
            </div>

            <Row className="text-center mt-4">
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

export default EditarEveBox;
