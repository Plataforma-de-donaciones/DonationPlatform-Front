import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../../../AuthContext";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import instance from "../../../../../axios_instance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Button, Card, CardHeader, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import PasswordInput from "./PasswordInput";
import { FaUser, FaLock } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Registratebutton1 from "./Registratebutton1";
import EnterButton from "./EnterButton";
import bcrypt from 'bcryptjs';
import Layout from "../../../../generales/src/components/layout/Layout";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputWrapper = styled.div`
  // display: flex;
  // align-items: center;
  // width: 100%;
`;

const CorreoNombreText = styled.span`
  font-weight: 700;
  color: #121212;
  text-align: left;
  margin-top: 10px;
  width: 100%;
`;

const ContrasenaText = styled.span`
  font-weight: 700;
  color: #121212;
  text-align: left;
  margin-top: 20px;
  width: 100%;
`;

const NotienescuentaaunWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
`;

const NotienescuentaaunText = styled.span`
  font-weight: 700;
  color: rgba(80,80,80, 1);
  text-align: left;
`;

const SocialLogosWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
`;

const GoogleLogo = styled.img`
  width: 38px;
  height: 38px;
  object-fit: contain;
  margin-right: 10px;
  cursor: pointer;
`;

const FbLogo = styled.img`
  width: 38px;
  height: 38px;
  object-fit: contain;
  margin-left: 10px;
`;

const LoginBox = () => {
  const [credentials, setCredentials] = useState({
    user_name: "",
    user_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [redirectToHome, setRedirectToHome] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (
      credentials.user_name.length == 0 ||
      credentials.user_password.length == 0
    ) {
      toast.error("Por favor complete los campos requeridos", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    // if (!recaptchaValue) {
    //   toast.error('Por favor, completa el reCAPTCHA.', {
    //     position: 'bottom-center',
    //     autoClose: 4000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: true,
    //     progress: undefined,
    //     theme: 'colored',
    //   });
    //   return;
    // }

    try {
      const hashedPassword = bcrypt.hashSync(credentials.user_password, 10);
      const response = await instance.post('/login/',credentials);

      if (response.status === 200) {
        const { token, user_data } = response.data;
        Cookies.set("token", token, { expires: 1 });
        Cookies.set("user_data", JSON.stringify(user_data), { expires: 1 });
        login();
        setRedirectToHome(true);
      } else if (response.status === 401) {
        setError("Usuario o contraseña incorrectos.");
        toast.error("Usuario o contraseña incorrectos.", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (response.data && response.data.error_message) {
        // Maneja el mensaje de error
      } else {
        setError("Error al iniciar sesión. Verifica tus credenciales.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(
        "Error al conectarse al servidor. Inténtalo de nuevo más tarde."
      );
    }
  };

  const handleGoogleLogin = async () => {
    // Implementa la lógica de inicio de sesión con Google aquí.
    // Usando las credenciales que generó Google para tu cliente OAuth.

    // Cuando el inicio de sesión con Google sea exitoso, puedes redirigir al usuario a la página de inicio.
    try {
      // Implementa la lógica de inicio de sesión con Google aquí.

      // Si el inicio de sesión con Google es exitoso, redirige al usuario a la página de inicio.
      login();
      setRedirectToHome(true);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      // Maneja errores si los hay.
    }
  };

  if (redirectToHome) {
    return <Redirect to="/inicio" />;
  }

  return (
    <>
      <Row className="mt-3 mx-auto">
        <Col  className="mt-auto mx-auto  col-xl-5 col-lg-6 col-md-9 col-sm-9 col-xs-9">
          <Card className="border-0 shadow rounded-3 mt-5 ">
            <CardHeader className="card-title text-center fw-light fs-5">
              Iniciar sesión
            </CardHeader>
            <Card.Body className="p-4 p-sm-4">
              <Form >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Nombre de usuario
                  </Form.Label>
                  <Form.Control
                    name="user_name"
                    value={credentials.user_name}
                    onChange={handleChange}
                    type="email"
                    placeholder="Nombre de usuario"
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <div style={{ position: "relative" }}>
                  <InputGroup hasValidation>
                    <PasswordInput
                      type="password"
                      name="user_password"
                      value={credentials.user_password}
                      onChange={handleChange}
                      passwordplaceholder="Contraseña"
                      style={{
                        height: 43,
                        width: "100%",
                        marginTop: 10,
                      }}
                    />
                  </InputGroup>
                  </div>
                </Form.Group>
                <div className="d-grid">
                  <Button 
                    onClick={handleSubmit}
                    variant="primary"
                    className="btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Ingresar
                  </Button>
                </div>
                <hr className="my-4" />
                <div className="text-center">
                  <NotienescuentaaunText>
                    ¿No tienes una cuenta aún?
                  </NotienescuentaaunText>
                  <Registratebutton1 />
                </div>
                <SocialLogosWrapper className="mx-auto">
                  <GoogleLogo
                    src={require("../assets/images/google.png")}
                    onClick={handleGoogleLogin}
                  />
                  <FbLogo
                    src={require("../assets/images/facebook-logo-5-1.png")}
                  />
                </SocialLogosWrapper>
                {error && (
                  <div className="error-message" style={{ color: "red" }}>
                    {error}
                  </div>
                )}
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
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LoginBox;
