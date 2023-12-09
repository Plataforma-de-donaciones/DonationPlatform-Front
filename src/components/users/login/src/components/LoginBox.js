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
import CardComponente from "../../../../generales/card/CardComponente";

const Container = styled.div`
  display: flex;
  justify-content: center
  flex-direction : column;
  align-items: center;
  padding:32px;
  min-width: 200px;
  max-width: 800px;

  @media (max-width: 576px) {
    padding:32px;
  }
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

const Row1 = styled(Row)`
  margin-bottom: 30px;
`;

const Col1 = styled(Col)`
  margin-bottom: 30px;
`;

const CardStyled = styled(Card)`
  margin-bottom: 30px; 

  &.card-alta {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    border: 1px solid #ddd;
    width: 500px;
  }
`;

const Card1 = styled(CardComponente)`
  width: 100%;
  max-width: 600px; 
  margin: 32px auto;
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
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
`;

const NotienescuentaaunText = styled.span`
  font-weight: 700;
  color: rgba(80,80,80, 1);
  text-align: center;
  margin-bottom: 10px;
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
  cursor: pointer;
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
   
    try {
     
      login();
      setRedirectToHome(true);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
     
    }
  };

  if (redirectToHome) {
    return <Redirect to="/inicio" />;
  }

  return (
    <main>
    <Row1 className="mt-4">
    <Col1>
    <CardStyled className="card-alta">
        <Card.Header className="text-center h5">Iniciar sesión</Card.Header>
        <Card.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              name="user_name"
              value={credentials.user_name}
              onChange={handleChange}
              type="email"
              placeholder="Ingrese aquí su nombre de usuario"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
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
          <hr className="my-3" />
            <NotienescuentaaunWrapper>
              <NotienescuentaaunText>
                ¿No tienes una cuenta aún?
              </NotienescuentaaunText>
              <Registratebutton1/>
            </NotienescuentaaunWrapper>
            <SocialLogosWrapper className="mx-auto mt-3 mb-3">
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
        </Card.Body>
      </CardStyled>
    </Col1>
    </Row1>
    </main>
  );
};

export default LoginBox;
