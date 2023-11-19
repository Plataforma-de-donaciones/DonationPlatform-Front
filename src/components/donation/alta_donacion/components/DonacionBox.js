import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import TipodePublicacionBox from "./../../../volunteer/alta_voluntario/components/TipodePublicacionBox";
import LocalidadBox from "./../../../volunteer/alta_voluntario/components/LocalidadBox";
import ImagenDonEditarBox from "./../../editar_donacion/src/components/ImagenDonEditarBox";
import {
  Form,
  Row,
  Col,
  InputGroup,
  Button,
  Card,
  CardBody,
} from "react-bootstrap";
import CardComponente from "../../../generales/card/CardComponente";

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

const DonacionBox = (props) => {
  const [donationData, setDonationData] = useState({
    don_name: "",
    don_description: "",
    type: "",
    state: 1,
    don_created_at: new Date().toISOString(),
    user: "",
    zone: null,
    geom_point: null,
    has_requests: false,
    request_count: 0,
    don_attachment: null,
  });

  const [errors, setErrors] = useState({});
  const token = cookies.get("token");
  const [user_id, setUserId] = useState(null);
  const [file, setFile] = useState(null);
  const history = useHistory();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const userDataCookie = cookies.get("user_data");
    if (userDataCookie) {
      setUserId(userDataCookie.user_id);
    }
  }, []);

  useEffect(() => {
    setDonationData((prevData) => ({
      ...prevData,
      user: user_id || "",
    }));
  }, [user_id]);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleFieldChange = (fieldName, event) => {
    const value = event.target.value;

    setDonationData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  const handleZoneSelect = (zoneId) => {
    setDonationData((prevData) => ({
      ...prevData,
      zone: zoneId,
    }));
  };

  const handleTipoPublicacionSelect = (selectedValue) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      type: "",
    }));
    setDonationData((prevData) => ({
      ...prevData,
      type: selectedValue,
    }));
  };

  const validateField = (fieldName, value) => {
    if (fieldName === "don_name" && (!value || !value.toString().trim())) {
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
    } else if (fieldName === "don_name" && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }

    if (
      fieldName === "don_description" &&
      (!value || !value.toString().trim())
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "La descripción no puede estar vacía",
      }));
    }

    if (fieldName === "zone" && !value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }else if (fieldName === "type" && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
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
            formData.append("don_attachment", file);
          }

          Object.entries(donationData).forEach(([key, value]) => {
            if (key !== "don_attachment") {
              formData.append(key, value);
            }
          });
            
        
          const formDataEntries = [...formData.entries()];
       

          const response = await instance.post("/donations/", formData, {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 201) {
            Swal.fire("¡Donación registrada correctamente!", "", "success");
            history.push("/listadodonacion");
          } else {
            const serverError = response.data;
            console.log(response);
            if (serverError) {
              toast.error(serverError, {
                position: "bottom-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
  
            } else {
              // Manejar otros errores
            }
          }
        } catch (error) {
          console.error("Error al registrar equipo médico:", error);
          console.log("Respuesta del servidor:", error.response); // Agrega esta línea
          // Manejar errores de la solicitud
        }
      }
    }

    setValidated(true);

    Object.keys(donationData).forEach((name) => {
      validateField(name, donationData[name]);
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
        history.push("/listadodonacion");
      }
    });
  };

  return (
    <>
      <CardComponente
        titulo={"Registra tu Donación"}
        body={
          <>
            <Form noValidate validated={validated} onSubmit={handleAccept}>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>¿Cuál es el nombre de la donación? *</Form.Label>

                  <Form.Control
                    value={donationData["don_name"]}
                    required
                    type="text"
                    placeholder="Nombre de la donación"
                    onChange={(event) => handleFieldChange("don_name", event)}
                    maxlength={50}
                    minLength={3}
                  />

                  <Form.Control.Feedback type="invalid">
                    Por favor digite su nombre
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>
                    ¡Campo válido!
                  </Form.Control.Feedback>
                  <HelperText>
                    Este dato se visualiza en la publicación.
                  </HelperText>
                </Form.Group>
                <p></p>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>¿Cómo describirías a la donación? * </Form.Label>

                  <Form.Control
                    as="textarea"
                    value={donationData["don_description"]}
                    required
                    type="text"
                    placeholder="Describa la donación"
                    onChange={(event) =>
                      handleFieldChange("don_description", event)
                    }
                    maxlength={250}
                    minLength={3}
                  />

                  <Form.Control.Feedback type="invalid">
                    La descripción de la tarea no puede estar vacía
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
                  <HelperText>
                    Este dato se visualiza en la publicación.
                  </HelperText>
                </Form.Group>

                <p></p>
                <TipodePublicacionBox onSelect={handleTipoPublicacionSelect} />
                <HelperText>
                  Este dato se visualiza en la publicación.
                </HelperText>

                <p></p>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <LocalidadBox onSelect={handleZoneSelect} />
                  {errors.zone && (
                    <span style={{ color: "red" }}>{errors.zone}</span>
                  )}

                  <Form.Control.Feedback type="invalid">
                    Localidad requerida
                  </Form.Control.Feedback>

                  <Form.Control.Feedback>
                    ¡Campo válido!
                  </Form.Control.Feedback>

                  <HelperText>
                    Este dato se visualiza en la publicación.
                  </HelperText>
                </Form.Group>
                <p></p>

                <ImagenDonEditarBox
                  className="text-center"
                  style={{ width: "20%" }}
                  handleFileChange={handleFileChange}
                  titulo={"Adjunte una imagen por favor"}
                />
              </Row>

              <Form.Group className="mb-3">

              </Form.Group>

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

export default DonacionBox;
