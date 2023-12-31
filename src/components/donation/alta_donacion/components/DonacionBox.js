import React, { useState, useEffect } from "react";
import styled from "styled-components";
import '../../../generales/src/assets/estilos.css'
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import {Button, Card, CardHeader, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import TipodePublicacionBox from "../../../generales/src/components/TipodePublicacionBox";
import LocalidadBox from "../../../generales/src/components/LocalidadBoxAlta";
import ImagenDonEditarBox from "../../../generales/src/components/ImagenDonEditarBox";
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

            }
          }
        } catch (error) {
          console.error("Error al registrar equipo médico:", error);
          console.log("Respuesta del servidor:", error.response); 
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
    <main>
    <Row1 className="mt-4">
    <Col1>
      <CardStyled className="card-alta">
        <Card.Header className="text-center h5">Regístra la donación</Card.Header>
        <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleAccept}>
                <Form.Group className="mb-3" controlId="validationCustom01">
                  <Form.Label>¿Cuál es el nombre de la donación? *</Form.Label>
                  <Form.Control
                    value={donationData["don_name"]}
                    required
                    type="text"
                    placeholder="Ingrese aquí el nombre de la donación."
                    onChange={(event) => handleFieldChange("don_name", event)}
                    maxlength={50}
                    minLength={3}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese el nombre de la donación, no puede estar vacío.
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
                  <HelperText> Este dato se visualiza en la publicación. Máximo 50 caracteres.</HelperText>
                </Form.Group>

                <Form.Group className="mb-3" controlId="validationCustom01">
                  <Form.Label>¿Cómo describirías la donación? * </Form.Label>
                  <Form.Control
                    as="textarea"
                    value={donationData["don_description"]}
                    required
                    type="text"
                    placeholder="Ingrese aquí la descripción de la donación."
                    onChange={(event) =>
                      handleFieldChange("don_description", event)
                    }
                    maxlength={250}
                    minLength={3}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese la descripción de la donación, no puede estar vacía.
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
                  <HelperText>Este dato se visualiza en la publicación. Máximo 250 caracteres.</HelperText>
                </Form.Group>

                <TipodePublicacionBox onSelect={handleTipoPublicacionSelect} />

                <Form.Group className="mb-3" controlId="validationCustom01">
                  <LocalidadBox onSelect={handleZoneSelect} />
                  {errors.zone && (
                    <span style={{ color: "red" }}>{errors.zone}</span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3 d-flex justify-content-center align-items-center">
                  <ImagenDonEditarBox
                    handleFileChange={handleFileChange}
                    titulo={"Adjunte una imagen"}
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
export default DonacionBox;
