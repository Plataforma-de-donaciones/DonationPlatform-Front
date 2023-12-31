import React, { useState, useEffect } from "react";
import styled from "styled-components";
import '../../../../generales/src/assets/estilos.css'
import FbRegistroButton from "./FbRegistroButton";
import GoogleRegistroButton from "./GoogleRegistroButton";
import instance from "../../../../../axios_instance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import CardComponente from "../../../../generales/card/CardComponente";
import {Button, Card, CardHeader, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import PasswordInput from "../../../login/src/components/PasswordInput";

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

const SocialButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 0px;
`;

const RegistrateGratis1 = styled.p`
  color: #121212;
  font-size: 14px;
  margin: 20px 0px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const FormularioBox = (props) => {
  const [registrationData, setRegistrationData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_state: 1,
    organization: "",
  });

  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [validated, setValidated] = useState(false);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    const form = event.currentTarget;
    console.log(form);
    form.checkValidity();
    if (name === "user_password" && !isValidPassword(value)) {
      form.setCustomValidity("Este campo no es válido");

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]:
          "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número",
      }));
    } else {
      form.setCustomValidity("");
    }

    setRegistrationData({
      ...registrationData,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "user_name":
        if (!value) {
          errorMessage = "El nombre de usuario no puede estar vacío";
        }
        break;
      case "user_email":
        if (value && !isValidEmail(value)) {
          errorMessage = "Correo electrónico no válido.";
        }
        if (!value) {
          errorMessage = "El correo electrónico no puede estar vacío";
        }
        break;
      case "user_password":
        if (value && !isValidPassword(value)) {
          errorMessage =
            "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.";
        }
        if (!value) {
          errorMessage = "La contraseña no puede estar vacía";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    if (password.length < 8) {
      return false;
    }

    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;

    return uppercaseRegex.test(password) && numberRegex.test(password);
  }

  const handlePasswordBlur = (e) => {
    const form = e.currentTarget;
    const field = form.elements[2];
    console.log(field);
    validateField("user_password", field.value);

    if (!isValidPassword(form.elements[2].value)) {
      form.elements[2].setCustomValidity("Este campo no es válido");

      setErrors((prevErrors) => ({
        ...prevErrors,
        ["user_password"]: errors.user_password,
      }));
    } else {
      form.elements[2].setCustomValidity("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      try {
        const response = await instance.post(
          "/users/create/",
          registrationData,
          {
            headers: {
              Authorization: "Token d715b622b64cb27a4012562e7c24fd05b5050bbe",
            },
          }
        );

        if (response.status === 201) {
          Swal.fire("¡Usuario creado correctamente!", "", "success");
          history.push("/login");
        } else {
          const serverError = response.data;
          
          toast.error(serverError["user_name"][0], {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          if (serverError) {
            const fieldErrors = {};

            Object.keys(serverError).forEach((field) => {
              const errorMessage =
                Array.isArray(serverError[field]) && serverError[field][0];
              fieldErrors[field] = errorMessage || "Error desconocido";

            });

            setErrors((prevErrors) => ({
              ...prevErrors,
              ...fieldErrors,
            }));

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
            setErrors((prevErrors) => ({
              ...prevErrors,
              general: "Hubo un problema al crear el usuario.",
            }));
          }
        }
      } catch (error) {
        console.error("Error al crear usuario:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "Hubo un problema al crear el usuario.",
        }));
      }
    }

    setValidated(true);

    Object.keys(registrationData).forEach((name) => {
      validateField(name, registrationData[name]);
    });

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

  };
  const handleCancelarClick = () => {
    Swal.fire({
      title: "¿Está seguro que desea cancelar?",
      icon: "question",
      iconHtml: "?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/login");
      }
    });
  };

  return (
    <main>
    <Row1 className="mt-4">
    <Col1>
    <CardStyled className="card-alta">
        <Card.Header className="text-center h5">Regístrate con</Card.Header>
        <Card.Body>
            <SocialButtonsContainer className="d-flex justify-content-center gap-4">
              <FbRegistroButton />
              <GoogleRegistroButton />
            </SocialButtonsContainer>
            <RegistrateGratis1 style={{ textAlign: "center" }}>
              O completa el formulario:
            </RegistrateGratis1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationCustom01">
                  <Form.Label>¿Cuál es su nombre de usuario? *</Form.Label>
                  <Form.Control
                    value={registrationData["user_name"]}
                    required
                    type="text"
                    name="user_name"
                    placeholder="Ingrese aquí su nombre de usuario"
                    onChange={(event) => handleFieldChange(event)}
                    maxlength={50}
                    minLength={3}
                  />
                  <Form.Control.Feedback type="invalid">
                  Por favor ingrese su nombre, no puede estar vací0.
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="validationCustom01">
                  <Form.Label>¿Cuál es su correo electrónico? *</Form.Label>
                  <Form.Control
                    value={registrationData["user_email"]}
                    required
                    type="email"
                    placeholder="Ingrese aquí su correo electrónico"
                    onChange={(event) => handleFieldChange(event)}
                    name="user_email"
                    maxlength={50}
                    minLength={3}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese su correo electrónico, no puede estar vacío, o corrija su formato (mail@mail.com).
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group  className="mb-3" controlId="formBasicPassword">
                  <Form.Label>¿Cuál es su contraseña? *</Form.Label>
                  <div style={{ position: "relative" }}>
                  <InputGroup hasValidation>
                    <PasswordInput
                      name="user_password"
                      value={registrationData.user_password}
                      onChange={handleFieldChange}
                      onBlur={handlePasswordBlur}
                      mensaje={errors.user_password}
                      required
                      placeholder="Ingrese aquí su contraseña"
                      style={{
                        height: 43,
                        width: "100%",
                        marginTop: 10,
                      }}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.user_password}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
                  </InputGroup>
                  <HelperText>Mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.</HelperText>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
              <Form.Check
                    required
                    label="Al enviar este formulario acepta los términos y condiciones"
                    feedback="Es necesario leer y aceptar los términos"
                    feedbackType="invalid"
              />
            </Form.Group>

                <div className="d-flex justify-content-center gap-4">
                <Button variant="primary" type="submit">
                    Aceptar
                  </Button>
                  <Button variant="secondary" onClick={handleCancelarClick} className="btn-primary-forms">
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

export default FormularioBox;
