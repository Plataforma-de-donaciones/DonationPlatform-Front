import React, { useState } from "react";
import styled from "styled-components";
import Sessionheader from "./Sessionheader";
import UserInput from "./UserInput";
import PasswordInput from "./PasswordInput";
import Registratebutton1 from "./Registratebutton1";
import EnterButton from "./EnterButton";
import { FaUser, FaLock } from 'react-icons/fa';
//import Axios from 'axios'; // Importa Axios
import { Link } from "react-router-dom";
import instance from "../../../../axios_instance";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #CCC;
  background-color: #FFF;
  box-shadow: -2px 2px 1.5px 0.1px #000;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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
  color: #121212;
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
`;

const FbLogo = styled.img`
  width: 38px;
  height: 38px;
  object-fit: contain;
  margin-left: 10px;
`;

const LoginBox = () => {
  const [credentials, setCredentials] = useState({
    user_name: '',
    user_password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpia cualquier mensaje de error previo
    try {
      const response = await instance.post(
        "http://192.168.1.14/login/",
        credentials,
        {
          headers: {
            Authorization: "Token e2fa4c057c611857bb0c8aefc62ee3861017fe77",
          },
        }
      );
      console.log("Código de estado de la respuesta:", response.status);

      // Si la solicitud fue exitosa (código de respuesta 200), muestra el mensaje de éxito
      if (response.status === 200) {
            alert("Inicio de sesión exitoso!")        // Puedes también agregar lógica para redirigir a otra página si es necesario
          } else if (response.status === 401) {
            setError("Usuario o contraseña incorrectos.");
          } else if (response.data && response.data.error_message) {
            setError(response.data.error_message);
          } else {
            setError("Error al iniciar sesión. Verifica tus credenciales.");
          }
    } catch (error) {
      // Maneja los errores de la solicitud
      console.error("Error al iniciar sesión:", error);
      setError("Error al conectarse al servidor. Inténtalo de nuevo más tarde.");
    }
  };


  return (
    <Container>
      <Sessionheader style={{ width: "100%", height: 43 }} />
      <CorreoNombreText>Correo electrónico o nombre de usuario</CorreoNombreText>
      <InputWrapper>
        <FaUser
          style={{
            color: "rgba(0, 0, 0, 1)",
            fontSize: 40,
            marginRight: 10
          }}
        />
        <UserInput
          type="text"
          name="user_name"
          value={credentials.user_name}
          onChange={handleChange}
          style={{
            height: 43,
            width: "100%",
            marginTop: 10
          }}
          group="rgba(155,155,155,1)"
        />
      </InputWrapper>
      <ContrasenaText>Contraseña</ContrasenaText>
      <InputWrapper>
        <FaLock
          style={{
            color: "rgba(0, 0, 0, 1)",
            fontSize: 40,
            marginRight: 10
          }}
        />
        <PasswordInput
  type="password"
  name="user_password"
  value={credentials.user_password}
  onChange={handleChange}
  passwordplaceholder="Contraseña" // Cambia a data-passwordplaceholder
  style={{
    height: 43,
    width: "100%",
    marginTop: 10
  }}
/>
      </InputWrapper>
      <NotienescuentaaunWrapper>
        <NotienescuentaaunText>No tienes una cuenta aún?</NotienescuentaaunText>
        <Link to="/alta"> {/* Redirige a la página de alta de usuario */}
          <Registratebutton1
            style={{
              height: 17,
              width: 100,
              marginLeft: 10
            }}
          />
        </Link>
      </NotienescuentaaunWrapper>
      <SocialLogosWrapper>
        <GoogleLogo src={require("../assets/images/google.png")} />
        <FbLogo src={require("../assets/images/facebook-logo-5-1.png")} />
      </SocialLogosWrapper>
      <EnterButton
        style={{
          height: 36,
          width: 100,
          marginTop: 20,
          borderRadius: 100
        }}
        onClick={handleSubmit} // Agrega la función de inicio de sesión al botón
      />
      {error && <div className="error-message" style={{ color: "red" }}>{error}</div>}
    </Container>
  );
};

export default LoginBox;
