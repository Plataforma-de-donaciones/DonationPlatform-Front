import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Row, Col, Button, CardBody, Card, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import LocalidadBox from "./../../../alta_voluntario/components/LocalidadBox";
import instance from "../../../../../axios_instance";
import CardComponente from "../../../../generales/card/CardComponente";

const Container = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 1);
  flex-direction: column;
`;

const HelperText = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
  font-style: normal;
  font-weight: 400;
`;

const cookies = new Cookies();

const SolicitudVolBox = (props) => {
  const { voluntarioId } = useParams();
  const [solicitudData, setSolicitudData] = useState({
    req_name: "",
    req_description: "",
    zone: null,
    accept_terms: false,
    user: null,
    eq: null,
    don: null,
    vol: null,
    req_sent_date: new Date().toISOString(),
    has_confirmation: false,
    confirmed_at: null,
    state: 1,
    type: 2,
  });

  const [errors, setErrors] = useState({});
  const token = cookies.get("token");
  const [user_id, setUserId] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const userDataCookie = cookies.get("user_data");
    if (userDataCookie) {
      setUserId(userDataCookie.user_id);
    }
    setSolicitudData((prevData) => ({
      ...prevData,
      user: user_id || "",
      vol: voluntarioId || "",
    }));
  }, [voluntarioId, user_id]);

  const handleFieldChange = (fieldName, value) => {
    setSolicitudData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  const handleZoneSelect = (zoneId) => {
    setSolicitudData((prevData) => ({
      ...prevData,
      zone: zoneId,
    }));
  };

  const handleAcceptTermsChange = (isChecked) => {
    setSolicitudData((prevData) => ({
      ...prevData,
      accept_terms: isChecked,
    }));

    setAcceptTerms(isChecked);
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
          const response = await instance.post("/requests/", solicitudData, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (response.status === 201) {
            Swal.fire("¡Ofrecimiento registrado correctamente!", "", "success");
            history.push("/listadovoluntariado");
          } else {
          }
        } catch (error) {
          console.error("Error al crear solicitud:", error);
        }
      }
    }

    setValidated(true);

    Object.keys(solicitudData).forEach((name) => {
      validateField(name, solicitudData[name]);
    });

    if (!solicitudData.accept_terms) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        accept_terms: "Debe aceptar los términos",
      }));
      return;
    }
  };

  const validateField = (fieldName, value) => {
    if (fieldName === "req_name" && (!value || !value.toString().trim())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "El nombre no puede estar vacío",
      }));
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
        history.push("/listadovoluntariado");
      }
    });
  };

  //url:donarvoluntariado/id

  return (
    <>
      <CardComponente
        titulo={"Voluntariado"}
        body={
          <>
            <Form noValidate validated={validated} onSubmit={handleAccept}>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>
                    Describa las tareas que podría realizar *{" "}
                  </Form.Label>

                  <Form.Control
                    as="textarea"
                    value={solicitudData["req_description"]}
                    required
                    type="text"
                    placeholder="Describa el voluntariado"
                    onChange={(event) =>
                      handleFieldChange("req_description", event.target.value)
                    }
                    maxlength={250}
                    minLength={3}
                  />

                  <Form.Control.Feedback type="invalid">
                    La descripción de no puede estar vacía
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
                  <HelperText>
                    Este dato se visualiza únicamente por el donatario.
                    Asimismo, indique las condiciones del voluntariado.
                  </HelperText>
                </Form.Group>

                <p></p>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <LocalidadBox onSelect={handleZoneSelect} />
                  {errors.zone && (
                    <span style={{ color: "red" }}>{errors.zone}</span>
                  )}

                  <Form.Control.Feedback type="invalid">
                    Localidad requerida
                  </Form.Control.Feedback>

                  <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>

                  <HelperText>
                    Este dato se visualiza en la publicación.
                  </HelperText>
                </Form.Group>
                <p></p>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>¿Cuál es su nombre? </Form.Label>

                  <Form.Control
                    value={solicitudData["req_name"]}
                    type="text"
                    placeholder="Ingrese su nombre"
                    onChange={(event) =>
                      handleFieldChange("req_name", event.target.value)
                    }
                    maxlength={50}
                    minLength={3}
                  />
                  <HelperText>
                    Este dato se visualiza únicamente por el donatario.
                  </HelperText>
                </Form.Group>
                <p></p>
                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    label="Al enviar este formulario acepta los términos y condiciones"
                    feedback="Es necesario leer y aceptar los términos"
                    feedbackType="invalid"
                  />
                </Form.Group>
              </Row>

              <Row className="text-center">
                <Col>
                  <Button style={{ width: "30%" }} type="submit">
                    Aceptar
                  </Button>
                </Col>
                <Col>
                  <Button
                    style={{ width: "30%" }}
                    variant="secondary"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                </Col>
              </Row>
              <div className="text-center mx-auto"></div>
            </Form>
          </>
        }
      ></CardComponente>

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
    </>
  );
};

export default SolicitudVolBox;
