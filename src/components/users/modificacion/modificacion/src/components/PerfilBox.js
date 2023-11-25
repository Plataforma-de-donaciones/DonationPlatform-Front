import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";
import instance from "../../../../../../axios_instance";
import { useAuth } from "../../../../../../AuthContext";
import NombrePerfilBox from "./NombrePerfilBox";
import CorreoPerfilBox from "./CorreoPerfilBox";
import CardComponente from "./../../../../../generales/card/CardComponente";
import { Button, Col, Row ,InputGroup} from "react-bootstrap";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import PasswordInput from "../../../../login/src/components/PasswordInput";



const PreguntaEliminarText = styled.span`
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  text-align: center;
  margin-top: 30px;
  justify-content: center;
`;
const styles = {
  creaUnaContrasena: {
    fontSize: "12px",
    textAlign: "left",
    color: "rgba(0,0,0,1)",
    opacity: 0.6,
    paddingTop: "16px",
    display: "block",
  },
};
const cookies = new Cookies();

function PerfilBox(props) {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    user_name: "",
    user_email: "",
    organization: "",
    user_password: "",
  });

  const [contrasenaNueva, setContrasenaNueva] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [contrasenasCoinciden, setContrasenasCoinciden] = useState(true);
  const [userId, setUserId] = useState("");
  const history = useHistory();
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
    setContrasenasCoinciden(e.target.value === confirmarContrasena);
  };

  const handleConfirmarContrasenaChange = (e) => {
    setConfirmarContrasena(e.target.value);
    setContrasenasCoinciden(contrasenaNueva === e.target.value);
  };

  const handleBlur = () => {
    if (contrasenaNueva !== confirmarContrasena) {
      setContrasenasCoinciden(false);
    }
  };

  const eliminarItem = async (userId, tipo) => {
    console.log("id a eliminar", userId);

    Swal.fire({
      title: "¿Está seguro que desea eliminar su cuenta?",
      icon: "question",
      iconHtml: "?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await instance.delete(`/users/${userId}/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
  
          obtenerDatos();
          history.push("/inicio");
        } catch (error) {
          console.error(`Error al eliminar user:`, error);
        }
       
      }
    });

    // const confirmacion = window.confirm(`¿Desea eliminar el usuario?`);
  };
  const handleSubmit = async () => {
    const confirmation = await Swal.fire({
      title: "¿Está seguro que desea editar su contraseña?",
      icon: "question",
      iconHtml: "?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Cancelar",
    });
  
    if (confirmation.isConfirmed) {
      const requestData = {
        user_password: contrasenaNueva,
      };
  
      /*if (contrasenaNueva) {
        requestData.user_password = contrasenaNueva;
      }*/
  
      try {
        const token = cookies.get("token");
        const userDataCookie = cookies.get("user_data");
        const user_id = userDataCookie.user_id;
        const response = await instance.patch(`/users/${user_id}/`, requestData, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
  
        console.log("Respuesta del servidor:", response.data);
  
        if (response.status === 200) {
          cookies.remove("token");
          cookies.remove("user_data");
  
          Swal.fire({
            title: "Contraseña modificada con éxito, deberá iniciar sesión nuevamente.",
            icon: "success",
          });
  
          history.push("/login");
        } else {
          Swal.fire({
            title: "Error al editar la contraseña",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error al actualizar la información del usuario:", error);
      }
  
      setContrasenasCoinciden(true);
      setContrasenaNueva("");
      setConfirmarContrasena("");
    }
  };



  const handleCancel = () => {
    Swal.fire({
      title: "¿Está seguro que desea volver al inicio?",
      icon: "question",
      iconHtml: "?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/inicio");
      }
    });
  };

  //url: modificacion
  return (
    <>
      <CardComponente
      
        titulo={"Mi perfil"}
        body={
          <>
      
            <NombrePerfilBox user_name={userData.user_name} />
      
            
            <CorreoPerfilBox user_email={userData.user_email} 
            />
            
            <label style={styles.creaUnaContrasena}>Contraseña nueva</label>
            <InputGroup hasValidation>
            <PasswordInput
              placeholder="Confirmar Contraseña Nueva"
              value={contrasenaNueva}
              onChange={handleContrasenaNuevaChange}
              onBlur={handleBlur}
              style={{
                height: 43,
                width: "100%",
                marginTop: 10,
              }}
            />
             </InputGroup>
            
            <label style={styles.creaUnaContrasena}>Contraseña nueva</label>
            <InputGroup hasValidation>
            <PasswordInput
              placeholder="Confirmar Contraseña Nueva"
              value={confirmarContrasena}
              onChange={handleConfirmarContrasenaChange}
              onBlur={handleBlur}
              style={{
                height: 43,
                width: "100%",
                marginTop: 10,
              }}
              
            />
                  </InputGroup>
            {!contrasenasCoinciden && (
              <div
                style={{ color: "red", textAlign: "center", marginTop: "10px" }}
              >
                Las contraseñas no coinciden
              </div>
            )}
          
         


            <Row className="mx-auto text-center mb-3 mt-4">
              <Col>
                <Button style={{ width: "45%" }} onClick={handleSubmit}>
                  Aceptar
                </Button>
              </Col>

              <Col>
                <Button
                  history={props.history}
                  style={{ width: "45%", marginLeft: "4%" }}
                  onClick={handleCancel}
                  variant="secondary"
                >
                  Volver
                </Button>
              </Col>
            </Row>

            <Row className="mx-auto"> 

            <PreguntaEliminarText className="mx-auto">
              ¿Desea eliminar su cuenta?
            </PreguntaEliminarText>
            
              <Button
              className="mx-auto mt-3"
              variant="danger"
              style={{ width: "28%", marginLeft: "4%" }}
              onClick={() => eliminarItem(userId)}
              userId={userId}
              >   Eliminar cuenta
              </Button>
            
              </Row>
              <p></p>
          </>
        }
      ></CardComponente>
    </>
  );
}

export default PerfilBox;
