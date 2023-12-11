import React, { useState, useEffect } from "react";
import styled from "styled-components";
import '../../../generales/src/assets/estilos.css'
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";
import DateTimePicker from "./DatePicker";
import DateTimePickerFinal from "./DatePickerFinal";
import CardComponente from "./../../../generales/card/CardComponente";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import LocalidadBox from "../../../generales/src/components/LocalidadBoxAlta";
import { ToastContainer, toast } from "react-toastify";
import ImagenDonEditarBox from "../../../generales/src/components/ImagenDonEditarBox";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "react-toastify/dist/ReactToastify.css";


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
  background-color: rgba(255, 255, 255, 1);
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TitleContainer = styled.div`
  position: relative;
  background-color: rgba(255, 152, 0, 0.5);
`;

const Title = styled.h2`
  font-size: 20px;
  color: #121212;
  font-weight: 700;
  margin: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonSeparator = styled.div`
  width: 10px; /* Espacio entre los botones */
`;

const LoremIpsum = styled.span`
  left: 53px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  font-size: 20px;
  top: 5px;
`;

const UntitledComponent1Stack = styled.div`
  width: 400px;
  height: 35px;
  margin-top: 15px;
  position: relative;
`;

const cookies = new Cookies();

const EventoBox = (props) => {
  const [eventData, setEventData] = useState({
    event_name: "",
    event_description: "",
    type: 2,
    state: 1,
    event_date: new Date().toISOString(),
    user: "",
    zone: null,
    attachments: null,
    start_date: null,
    end_date: null,
  });

  const [errors, setErrors] = useState({});
  const token = cookies.get("token");
  const [user_id, setUserId] = useState(null);
  const [file, setFile] = useState(null);
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const userDataCookie = cookies.get("user_data");
    if (userDataCookie) {
      setUserId(userDataCookie.user_id);
    }
  }, []);

  useEffect(() => {
    setEventData((prevData) => ({
      ...prevData,
      user: user_id || "",
    }));
  }, [user_id]);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleFieldChange = (fieldName, value) => {
    const fieldValue = typeof value === "object" ? value.target.value : value;
    setEventData((prevData) => ({
      ...prevData,
      [fieldName]:
        fieldValue && fieldValue._isValid
          ? fieldValue.toISOString()
          : fieldValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  const handleZoneSelect = (zoneId) => {
    setEventData((prevData) => ({
      ...prevData,
      zone: zoneId,
    }));
  };

  const validateField = (fieldName, value) => {
    if (fieldName === "event_name" && (!value || !value.toString().trim())) {
      toast.error("Por favor, complete los campos requeridos", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "El nombre no puede estar vacío",
      }));
    } else if (fieldName === "event_name" && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }

    if (fieldName === "start_date" && !value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "Debe seleccionar una fecha de inicio",
      }));
    } else if (fieldName === "start_date" && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }
    if (!eventData.start_date) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        start_date: "Debe seleccionar una fecha de inicio",
      }));
    }
  };

  const handleAccept = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const confirmation = await Swal.fire({
        title: "Protege tu Privacidad",
        html: `
        <p>Por su seguridad y la de los demás, le recordamos evitar publicar fotos y/o videos, o descripción en la publicación que contengan información personal o la de otras personas. Estos pueden incluir Nombre, Teléfono, Dirección, entre otros.</p>
        <p>En caso de necesitar brindar datos personales para concretar el acto benéfico, le sugerimos que lo realice de manera segura mediante el chat privado.</p>
        <p>Ayuda a crear un entorno en línea seguro para todos.</p>
        <p>¡Gracias por su colaboración!</p>
        <p>¿Usted confirma que esta publicación no incluye contenido que revele información sensible?</p>`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

      if (confirmation.isConfirmed) {
        try {
          const formData = new FormData();
          if (file) {
            formData.append("attachments", file);
          }
          Object.entries(eventData).forEach(([key, value]) => {
            if (key !== "attachments") {
              formData.append(key, value);
            }
          });
          console.log("Contenido de FormData:");
          const formDataEntries = [...formData.entries()];
          console.log(formDataEntries);

          const response = await instance.post("/events/", formData, {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 201) {
            Swal.fire(
              '¡Evento registrado correctamente!',
              '',
              'success'
            )
            history.push('/listadoeventos');
          } else {
            const serverError = response.data;
            console.log(response);
            if (serverError) {
            } else {
            }
          }
        } catch (error) {
          console.error("Error al registrar evento:", error);
          console.log("Respuesta del servidor:", error.response);
        }
      }
    }

    setValidated(true);

  Object.keys(eventData).forEach((name) => {
    validateField(name, eventData[name]);
  });

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
        history.push("/listadoeventos");
      }
    });
  };

  //continuar - listadoeventos

  return (
    <main>
    <Row1 className="mt-4">
    <Col1>
      <CardStyled className="card-alta">
        <Card.Header className="text-center h5">Regístra el evento</Card.Header>
        <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleAccept}>
              <Form.Group className="mb-3">
                  <Form.Label>¿Cuál es el nombre del evento? *</Form.Label>
                  <Form.Control
                    value={eventData["event_name"]}
                    required
                    type="text"
                    placeholder="Ingrese aquí el nombre del evento."
                    onChange={(event) => handleFieldChange("event_name", event)}
                    maxlength={50}
                    minLength={3}
                  />
                  <Form.Control.Feedback type="invalid">
                  Por favor ingrese el nombre del evento, no puede estar vacío.
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
                  <HelperText> Este dato se visualiza en la publicación. Máximo 50 caracteres.</HelperText>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>¿Cómo describirías el evento? * </Form.Label>
                  <Form.Control
                    as="textarea"
                    value={eventData["event_description"]}
                    required
                    type="text"
                    placeholder="Ingrese aquí la descripción del evento."
                    onChange={(event) => handleFieldChange("event_description", event)}
                    maxlength={250}
                    minLength={3}
                  />
                  <Form.Control.Feedback type="invalid">
                  Por favor ingrese la descripción del evento, no puede estar vacía.
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
                  <HelperText>Este dato se visualiza en la publicación. Máximo 250 caracteres.</HelperText>
                </Form.Group>

                <Form.Group className="mb-3">
                  <LocalidadBox onSelect={handleZoneSelect} />
                  {errors.zone && (
                    <span style={{ color: "red" }}>{errors.zone}</span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <DateTimePicker
                    value={eventData.start_date}
                    onChange={(date) => handleFieldChange("start_date", date)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <DateTimePickerFinal
                    selectedDate={eventData.end_date}
                    onChange={(date) => handleFieldChange("end_date", date)}
                  />
                </Form.Group>

                <Form.Group className="mb-3 d-flex justify-content-center align-items-center">
                  <ImagenDonEditarBox
                    handleFileChange={handleFileChange}
                    titulo={"Adjunte una imagen."}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center gap-4">
                  <Button variant="primary" type="submit" className="btn-primary-forms">
                    Aceptar
                  </Button>
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancelar
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

export default EventoBox;
