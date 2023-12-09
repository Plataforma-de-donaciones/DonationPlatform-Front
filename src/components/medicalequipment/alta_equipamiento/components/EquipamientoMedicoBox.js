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
import ImagenDonEditarBox from "../../../generales/src/components/ImagenDonEditarBox";
import TipodePublicacionBox from "../../../generales/src/components/TipodePublicacionBox";
import LocalidadBox from "../../../generales/src/components/LocalidadBoxAlta";
import { validate } from "json-schema";
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

const EquipamientoMedicoBox = (props) => {
  const [equipmentData, setEquipmentData] = useState({
    eq_name: "",
    eq_description: "",
    type: "",
    state: 1,
    eq_created_at: new Date().toISOString(),
    user: "",
    zone: null,
    geom_point: null,
    has_requests: false,
    request_count: 0,
    eq_attachment: null,
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
    setEquipmentData((prevData) => ({
      ...prevData,
      user: user_id || "",
    }));
  }, [user_id]);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleFieldChange = (fieldName, event) => {
    const value = event.target.value;

    setEquipmentData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  const handleZoneSelect = (zoneId) => {
    setEquipmentData((prevData) => ({
      ...prevData,
      zone: zoneId,
    }));
  };

  const handleTipoPublicacionSelect = (selectedValue) => {
    // Haz lo que necesites con el valor seleccionado
    console.log("Tipo de publicación seleccionado:", selectedValue);
    // Puedes almacenar el valor en el estado del componente si es necesario
    setEquipmentData((prevData) => ({
      ...prevData,
      type: selectedValue,
    }));
  };

  const validateField = (fieldName, value) => {
    if (fieldName === "eq_name" && (!value || !value.toString().trim())) {
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
    } else if (fieldName === "eq_name" && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }

    if (fieldName === "type" && !value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "Debe seleccionar un tipo de publicación",
      }));
    }

    if (fieldName === "eq_description" && !value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "La descripción no puede estar vacía",
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
      handleConfirmation();
    }

    setValidated(true);

    Object.keys(equipmentData).forEach(async (name) => {
      validateField(name, equipmentData[name]);
    });
  };

  const handleConfirmation = async () => {
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
        await handleRequest(); // Lógica de manejo de la solicitud
      } catch (error) {
        console.error("Error al manejar la solicitud:", error);
      }
    }
  };

  const handleRequest = async () => {
    try {
      const formData = new FormData();

      if (file) {
        formData.append("eq_attachment", file);
      }

      // Agregar otros campos al formData
      Object.entries(equipmentData).forEach(([key, value]) => {
        if (key !== "eq_attachment") {
          formData.append(key, value);
        }
      });

      const formDataEntries = [...formData.entries()];

      const response = await instance.post("/medicalequipments/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        Swal.fire(
          "¡Equipamiento médico registrado correctamente!",
          "",
          "success"
        );
        history.push("/listadoequipamiento");
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
      console.log("Respuesta del servidor:", error.response);
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
        history.push("/listadoequipamiento");
      }
    });
  };

  return (
    <main>
    <Row1 className="mt-4">
    <Col1>
    <CardStyled className="card-alta">
        <Card.Header className="text-center h5">Regístra el equipamiento médico</Card.Header>
        <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleAccept}>
                <Form.Group className="mb-3" controlId="validationCustom01">
                  <Form.Label>¿Cuál es el nombre del equipamiento médico? *</Form.Label>
                  <Form.Control
                    value={equipmentData["eq_name"]}
                    required
                    type="text"
                    placeholder="Ingrese aquí el nombre del equipamiento médico."
                    onChange={(event) => handleFieldChange("eq_name", event)}
                    maxlength={50}
                    minLength={3}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese el nombre del equipamiento médico
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
                  <HelperText> Este dato se visualiza en la publicación. Máximo 50 caracteres.</HelperText>
                </Form.Group>

                <Form.Group className="mb-3" controlId="validationCustom01">
                  <Form.Label>¿Cómo describirías el equipamiento médico? *</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={equipmentData["eq_description"]}
                    required
                    type="text"
                    placeholder="Ingrese aquí la descripción del equipamiento médico."
                    onChange={(event) => handleFieldChange("eq_description", event)}
                    maxlength={250}
                    minLength={3}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese la descripción del equipamiento médico no puede estar vacía
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
                  <HelperText>Este dato se visualiza en la publicación. Máximo 250 caracteres.</HelperText>
                </Form.Group>

                <TipodePublicacionBox onSelect={handleTipoPublicacionSelect} />
                <HelperText>Este dato se visualiza en la publicación.</HelperText>

                <Form.Group className="mb-3" controlId="validationCustom01">
                  <LocalidadBox onSelect={handleZoneSelect} />
                  {errors.zone && (
                    <span style={{ color: "red" }}>{errors.zone}</span>
                  )}
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese la localidad
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
                  <HelperText>Este dato se visualiza en la publicación.</HelperText>
                </Form.Group>

                <Form.Group className="mb-3">
                  <ImagenDonEditarBox
                    handleFileChange={handleFileChange}
                    titulo={"Adjunte una imagen"}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center gap-4">
                  <Button variant="primary" type="submit">
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

export default EquipamientoMedicoBox;
