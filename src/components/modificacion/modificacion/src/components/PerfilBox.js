import React, { useState, useEffect } from "react";
import styled from "styled-components";
//import axios from "axios";
import Cookies from "universal-cookie";
import instance from "../../../../../axios_instance";
import { useAuth } from "../../../../../AuthContext";
import NombrePerfilBox from "./NombrePerfilBox";
import CorreoPerfilBox from "./CorreoPerfilBox";
import ContrasenaNuevaPerfilBox from "./ContrasenaNuevaPerfilBox";
import OrganizacionPerfilBox from "./OrganizacionPerfilBox";
import AceptarButton from "./AceptarButton";
import CancelarButton from "./CancelarButton";
import EliminarCuentaButton from "./EliminarCuentaButton";

const Container = styled.div`
  max-width: 800px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ContentContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

const Rect = styled.div`
  width: 100%;
  background-color: rgba(255, 152, 0, 0.6);
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  padding: 6px 0px 0px 0px;
  text-align: center;
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

const cookies = new Cookies();

function PerfilBox(props) {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    user_name: "",
    user_email: "",
    organization: "",
  });

  const [contrasenaNueva, setContrasenaNueva] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [contrasenasCoinciden, setContrasenasCoinciden] = useState(true);

  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedToken = cookies.get("token");
        setToken(retrievedToken);
        const userDataCookie = cookies.get("user_data");
        const user_email = userDataCookie.user_email;

        const response = await instance.post(
          "/users/search/",
          { user_email },
          {
            headers: {
              Authorization: `Token ${retrievedToken}`,
            },
          }
        );
        const userDataFromApi = response.data[0];
        console.log("Respuesta de la API:", userDataFromApi);
        setUserData({
          user_name: userDataFromApi.user_name,
          user_email: userDataFromApi.user_email,
          organization: userDataFromApi.organization,
        });
        console.log(userDataFromApi.user_name);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchData();
  }, []);

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
  const handleOrganizacionChange = (selectedOrganization) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      organization: selectedOrganization,
    }));
  };

  const handleSubmit = async () => {
    if (contrasenaNueva !== confirmarContrasena) {
      setContrasenasCoinciden(false);
      return;
    }

    try {
      const token = cookies.get("token");
      const userDataCookie = cookies.get("user_data");
      const user_id = userDataCookie.user_id;
      const response = await instance.patch(
        `/users/${user_id}/`,
        {
          user_name: userData.user_name,
          organization: userData.organization,
          new_password: contrasenaNueva,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

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
          {/* Asignar valores iniciales a los componentes */}
          <NombrePerfilBox user_name={userData.user_name} />
          <CorreoPerfilBox user_email={userData.user_email} />
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
        <OrganizacionPerfilBox
        selectedOrganization={userData.organization}
        onChange={handleOrganizacionChange}
      />
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