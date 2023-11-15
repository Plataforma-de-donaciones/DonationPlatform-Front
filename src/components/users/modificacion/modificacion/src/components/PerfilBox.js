import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";
import instance from "../../../../../../axios_instance";
import { useAuth } from "../../../../../../AuthContext";
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

const ButtonContainer = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;

`;
const ButtonContainerEliminar = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;

`;

const ButtonSeparator = styled.div`
  width: 10px; /* Espacio entre los botones */
`;

const PerfilText = styled.span`
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  text-align: center;
  margin-top: 6px;
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
  justify-content: center;

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
  const [userId, setUserId] = useState("");


  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedToken = cookies.get("token");
        setToken(retrievedToken);

        const userDataCookie = cookies.get("user_data");
        if (userDataCookie) {
          const user_id = userDataCookie.user_id;
          setUserId(user_id);

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
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchData();
  }, []);
  

  const obtenerDatos = async () => {
    // Lógica para obtener datos
    // ...
  };

  const handleContrasenaNuevaChange = (e) => {
    setContrasenaNueva(e.target.value);
    setContrasenasCoinciden(true);
    // Configurar la nueva contraseña en las cookies
    cookies.set("new_password", e.target.value, { path: "/" });
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
  const eliminarItem = async (userId, tipo) => {
    console.log("id a eliminar", userId);
    const confirmacion = window.confirm(`¿Desea eliminar el usuario?`);
  
    if (confirmacion) {
      try {
        await instance.delete(`/users/${userId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
  
        obtenerDatos();
      } catch (error) {
        console.error(`Error al eliminar user:`, error);
      }
    }
  };
  const handleSubmit = async () => {
    let requestData = {
      user_name: userData.user_name,
      organization: userData.organization,
    };
  
    if (contrasenaNueva) {
      requestData.new_password = contrasenaNueva;
    }
  
    try {
      const token = cookies.get("token");
      const userDataCookie = cookies.get("user_data");
      const user_id = userDataCookie.user_id;
      const response = await instance.patch(
        `/users/${user_id}/`,
        requestData,
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
    <Container {...props} className="mx-auto">
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
      <ButtonContainer>
        <AceptarButton onClick={handleSubmit} />
        <ButtonSeparator />
        <CancelarButton />
      </ButtonContainer>
      <PreguntaEliminarText>¿Desea eliminar su cuenta?</PreguntaEliminarText>
      <ButtonContainerEliminar>
        <EliminarCuentaButton onClickEliminar={eliminarItem} userId={userId} />
      </ButtonContainerEliminar>
      </ContentContainer>
    </Container>
  );
}

export default PerfilBox;
