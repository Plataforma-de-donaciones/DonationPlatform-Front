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
import instance from "../../../../../axios_instance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';


const Container = styled.div`
  background-color: rgba(255, 255, 255, 1);
  min-height: 100vh;
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
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: -50px;
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
    user_name: "",
    user_email: "",
    user_password: "",
    user_state: 1,
    organization: "",
  });

  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
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
        if(!value){
          errorMessage = "El correo electrónico no puede estar vacío";
        }
        break;
      case "user_password":
        if (value && !isValidPassword(value)) {
          errorMessage =
            "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.";
        }
        if(!value){
          errorMessage = "La contraseña no puede estar vacía";
        }
        break;
      // Puedes agregar más validaciones según tus necesidades
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
    // Verificar la longitud mínima de la contraseña
    if (password.length < 8) {
      return false;
    }

    // Verificar al menos una mayúscula y un número
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;

    return uppercaseRegex.test(password) && numberRegex.test(password);
  }

  const handlePasswordBlur = () => {
    validateField("user_password", registrationData.user_password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar la solicitud
    Object.keys(registrationData).forEach((name) => {
      validateField(name, registrationData[name]);
    });

    // Verificar si hay errores en los campos
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    // Intentar enviar la solicitud
    try {
      const response = await instance.post("/users/create/", registrationData, {
        headers: {
          Authorization: "Token e2fa4c057c611857bb0c8aefc62ee3861017fe77",
        },
      });

      if (response.status === 201) {
        Swal.fire(
          'Usuario creado correctamente!',
          '',
          'success'
        )
        history.push('/login');
      } else {
        const serverError = response.data;

        if (serverError) {
          // Si hay errores específicos, mostrarlos en los campos correspondientes
          const fieldErrors = {};
          
          Object.keys(serverError).forEach((field) => {
            // Verificar si el mensaje de error es un array y tomar el primer elemento
            const errorMessage =
              Array.isArray(serverError[field]) && serverError[field][0];
              fieldErrors[field] = errorMessage || "Error desconocido";
             
            // Asignar el mensaje de error al campo
           

          });
          toast.error(fieldErrors , {
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
            ...fieldErrors,
          }));
        } else {
          // Si no hay errores específicos, mostrar el mensaje genérico
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
  };
  const handleCancelarClick = () => {
    Swal.fire({
      title: '¿Está seguro que desea cancelar?',
      icon: 'question',
      iconHtml: '?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        history.push('/login');
      }
    });
  };

  return (
    <Container>
      <ToastContainer />
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
            onChange={handleFieldChange}
            mensaje={errors.user_name}
          />
          <CorreoRegistroBox
            name="user_email"
            value={registrationData.user_email}
            onChange={handleFieldChange}
            mensaje={errors.user_email}
          />
          {errors.user_email && <div style={{ color: "red" }}>{errors.user_email}</div>}
          <ContrasenaTextBox
            name="user_password"
            value={registrationData.user_password}
            onChange={handleFieldChange}
            onBlur={handlePasswordBlur}
            mensaje={errors.user_password}
          />
          {errors.user_password && <div style={{ color: "red" }}>{errors.user_password}</div>}
          <OrganizacionRegistroBox
            name="organization"
            value={registrationData.organization}
            onChange={handleFieldChange}
          />
        </FormRow>
        <div style={{ color: "red" }}>{errors.general}</div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: "20px 0px" }}></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <AceptarButton onClick={handleSubmit} />
          <CancelarButton onClick={handleCancelarClick} />
        </div>
        {errors.general && <div style={{ color: "red" }}>{errors.general}</div>}
      </CenteredContent>
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
    </Container>
  );
};

export default FormularioBox;
