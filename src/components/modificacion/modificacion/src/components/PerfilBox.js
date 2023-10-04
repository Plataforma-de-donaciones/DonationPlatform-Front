import React, { useState, useEffect } from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import axios from "axios";

import NombrePerfilBox from "./NombrePerfilBox";
import CorreoPerfilBox from "./CorreoPerfilBox";
import ContrasenaNuevaPerfilBox from "./ContrasenaNuevaPerfilBox";
import PerfilContrasenaBox from "./PerfilContrasenaBox";
import OrganizacionPerfilBox from "./OrganizacionPerfilBox";
import AceptarButton from "./AceptarButton";
import CancelarButton from "./CancelarButton";
import EliminarCuentaButton from "./EliminarCuentaButton";

const Container = styled.div`
  max-width: 600px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  width: 100%;
`;

const ContentContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

const Rect = styled.div`
  max-width: 600px;
  height: 35px;
  background-color: rgba(255, 152, 0, 0.6);
  flex-direction: column;
  display: flex;
  margin-top: 15px;
  box-shadow: 0px 3px 5px 0.35px rgba(0, 0, 0, 1);
`;

const PerfilText = styled.span`
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  text-align: center;
  margin-top: 6px;
`;

const NombrePerfilBoxStack = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const AceptarButtonRow = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const PreguntaEliminarText = styled.span`
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  text-align: center;
  margin-top: 30px;
`;

function PerfilBox(props) {
  const [userData, setUserData] = useState({
    user_name: "",
    user_email: "",
    organization: "",
  });

  useEffect(() => {
    // Extrae la cookie del localStorage
    const tokenCookie = localStorage.getItem('tokenCookie');

    // Comprueba si la cookie está presente y no es nula o indefinida
    if (tokenCookie) {
      try {
        // Decodifica el token para obtener la información del usuario
        const decodedToken = jwt_decode(tokenCookie);

        // Actualiza el estado con los datos del usuario
        setUserData({
          user_name: decodedToken.user_name,
          user_email: decodedToken.user_email,
          organization: decodedToken.organization,
        });
      } catch (error) {
        // Maneja errores al decodificar el token
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);

  const [contrasenaNueva, setContrasenaNueva] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [contrasenasCoinciden, setContrasenasCoinciden] = useState(true);

  const handleContrasenaNuevaChange = (e) => {
    setContrasenaNueva(e.target.value);
    setContrasenasCoinciden(true);
  };

  const handleConfirmarContrasenaChange = (e) => {
    setConfirmarContrasena(e.target.value);
    setContrasenasCoinciden(true);
  };

  const handleBlur = () => {
    if (contrasenaNueva !== confirmarContrasena) {
      setContrasenasCoinciden(false);
    }
  };

  const handleSubmit = async () => {
    if (contrasenaNueva !== confirmarContrasena) {
      setContrasenasCoinciden(false);
      return;
    }

    try {
      const token = localStorage.getItem('tokenCookie');
      const decodedToken = jwt_decode(token);
      console.log("Cookies:", token);

      const response = await axios.patch(`https://192.168.1.14/users/${decodedToken.user_id}/`, {
        user_name: userData.user_name,
        organization: userData.organization,
        new_password: contrasenaNueva,
      });

      console.log("Respuesta del servidor:", response.data);

    } catch (error) {
      console.error("Error al actualizar la información del usuario:", error);
    }

    setContrasenasCoinciden(true);
    setContrasenaNueva("");
    setConfirmarContrasena("");
  };

  return (
    <Container {...props}>
      <Rect>
        <PerfilText>Perfil</PerfilText>
      </Rect>
      <ContentContainer>
        <NombrePerfilBoxStack>
          <NombrePerfilBox />
          <CorreoPerfilBox />
        </NombrePerfilBoxStack>
        <ContrasenaNuevaPerfilBox
          value={contrasenaNueva}
          onChange={handleContrasenaNuevaChange}
          onBlur={handleBlur}
        />
        <ContrasenaNuevaPerfilBox
          placeholder="Confirmar Contraseña Nueva"
          value={confirmarContrasena}
          onChange={handleConfirmarContrasenaChange}
          onBlur={handleBlur}
        />
        {!contrasenasCoinciden && (
          <div style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            Las contraseñas no coinciden
          </div>
        )}
        <OrganizacionPerfilBox />
        <AceptarButtonRow>
          <AceptarButton onClick={handleSubmit} />
          <CancelarButton />
        </AceptarButtonRow>
        <PreguntaEliminarText>¿Desea eliminar su cuenta?</PreguntaEliminarText>
        <EliminarCuentaButton />
      </ContentContainer>
    </Container>
  );
}

export default PerfilBox;
