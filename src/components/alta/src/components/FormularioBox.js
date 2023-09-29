import React, { useState } from "react";
import styled from "styled-components";
import FbRegistroButton from "./FbRegistroButton";
import GoogleRegistroButton from "./GoogleRegistroButton";
import NombreRegistroBox from "./NombreRegistroBox";
import CorreoRegistroBox from "./CorreoRegistroBox";
import ContrasenaTextBox from "./ContrasenaTextBox";
import OrganizacionRegistroBox from "./OrganizacionRegistroBox";
import AceptarButton from "./AceptarButton";
import CancelarButton from "./CancelarButton";
import Axios from 'axios'; // Importa Axios

const Container = styled.div`
  background-color: rgba(255, 255, 255, 1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 0px;
`;

const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Rect1 = styled.div`
  width: 100%;
  background-color: rgba(255, 152, 0, 0.6);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.35);
  margin-top: 15px;
  padding: 6px 0px 0px 0px;
  text-align: center;
`;

const RegistrateGratis = styled.h2`
  color: #121212;
  font-size: 20px;
  margin: 6px 0px 0px 0px;
`;

const MaterialButtonViolet = styled.div`
  height: 36px;
  width: 100px;
  margin: 20px 0px;
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
    user_name: '',
    user_email: '',
    user_password: '',
    user_state: 1,
    organization: '',
  });
  console.log(registrationData);
  const [error, setError] = useState(null);

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };
  function isValidEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function isValidPassword(password) {
    // Verificar la longitud mínima de la contraseña
    if (password.length < 8) {
      return false;
    }
  
    // Verificar al menos una mayúscula, un número y un símbolo
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*]/;
  
    return (
      uppercaseRegex.test(password) &&
      numberRegex.test(password) &&
      symbolRegex.test(password)
    );
  }
  const handlePasswordBlur = () => {
    if (registrationData.user_password && !isValidPassword(registrationData.user_password)) {
      setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.");
    } else {
      setError(""); 
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación de campos obligatorios
    if (!registrationData.user_name || !registrationData.user_email || !registrationData.user_password) {
      setError("Revise los campos obligatorios.");
      return;
    }
  
    // Validación de correo electrónico
    if (!isValidEmail(registrationData.user_email)) {
      setError("Correo electrónico no válido.");
      return;
    }
  
    // Validación de contraseña
    if (!isValidPassword(registrationData.user_password)) {
      setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.");
      return;
    }
  
    try {
      // Realiza una solicitud POST a la URL de creación de usuario
      const response = await Axios.post('http://192.168.1.14/users/create/', registrationData, {
        headers: {
          'Authorization': 'Token e2fa4c057c611857bb0c8aefc62ee3861017fe77',
        },
      });
  
      // Verificar respuesta del servidor
      if (response.status === 201) {
        // Usuario creado exitosamente
        alert("Usuario creado");
        // También puedes redirigir al usuario a una página de inicio de sesión, por ejemplo.
      } else {
        // Si la respuesta no es 201, hubo un error inesperado
        setError("Hubo un problema al crear el usuario.");
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setError("Hubo un problema al crear el usuario."); // Manejo de errores
    }
  };
  
  


  return (
    <Container>
      <CenteredContent>
        <Rect1>
          <RegistrateGratis>Regístrate con</RegistrateGratis>
        </Rect1>
        <SocialButtonsContainer>
          <FbRegistroButton />
          <GoogleRegistroButton />
        </SocialButtonsContainer>
        <RegistrateGratis1 style={{ textAlign: "center" }}>
          O completa el formulario:
        </RegistrateGratis1>
        <FormRow>
          <NombreRegistroBox
            name="user_name"
            value={registrationData.user_name}
            onChange={handleRegistrationChange}
          />
          <CorreoRegistroBox
            name="user_email"
            value={registrationData.user_email}
            onChange={handleRegistrationChange}
          />
          <ContrasenaTextBox
            name="user_password"
            value={registrationData.user_password}
            onChange={handleRegistrationChange}
            onBlur={handlePasswordBlur}
          />
          <OrganizacionRegistroBox
          name="organization"
          value={registrationData.organization}
          onChange={handleRegistrationChange} 
          />
        </FormRow>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: "20px 0px" }}>
        <AceptarButton onClick={handleSubmit} />
        <CancelarButton />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>} {/* Mostrar mensaje de error si existe */}
      </CenteredContent>
    </Container>
  );
};

export default FormularioBox;
