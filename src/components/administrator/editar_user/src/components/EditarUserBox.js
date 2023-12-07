import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import NombreUserEdicionBox from "./NombreUserEdicionBox";
import CorreoUserEditarBox from "./CorreoUserEditarBox";
import AceptarButton from "./AceptarButton";
import CancelarButton from "./CancelarButton";
import CardComponente from "../../../../generales/card/CardComponente";
import { Button, Col, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";


import { useParams } from "react-router-dom";

const cookies = new Cookies();

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const ButtonSeparator = styled.div`
  width: 10px; 
`;
const Container = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 1);
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 15px;
  margin-bottom: 100px;
  min-height: 70vh;
  align-items: center;
  justify-content: center;
`;

const Usuario = styled.span`
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  margin-top: 5px;
`;

const UntitledComponent1Stack = styled.div`
  width: 100%;
  height: auto;
  margin-top: 15px;
  position: relative;
`;

const MaterialButtonViolet2Row = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
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

const TitleText = styled.span`
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  text-align: center;
  margin-top: 6px;
`;

const EditarUserBox = (props) => {
  const [datosUsuario, setDatosUsuario] = useState({});
  const [userName, setUserName] = useState("");
  const [userCorreo, setUserCorreo] = useState("");
  const [emailError, setEmailError] = useState("");
  const history = useHistory();
  const token = cookies.get("token");

  const { user_id } = useParams();
  console.log(user_id);

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const response = await instance.post(
          "/users/searchbyid/",
          { id: user_id },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const usuario = response.data[0];
        setDatosUsuario(usuario);
        setUserName(usuario.user_name);
        setUserCorreo(usuario.user_email);
      } catch (error) {
        console.error("Error al cargar datos de la usuario:", error);
      }
    };

    if (user_id) {
      cargarDatosUsuario();
    }
  }, [user_id, token]);

  const handleUserCorreoChange = (e) => {
    const value = e.target.value;
    setUserCorreo(value);

    validateEmail(value);
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? "" : "Correo electrónico no válido");
  };

  const handleSubmit = async () => {
    if (emailError) {
      console.log("Correo electrónico no válido");
      return;
    }

    try {
      //const formData = new FormData();
      const requestData = {
        user_email: userCorreo,
      };

      const response = await instance.patch(`/users/${user_id}/`, requestData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 200) {
        Swal.fire("¡Usuario modificado con éxito!", "", "success");
        history.push("/listadousuarios");
      } else {
        const serverError = response.data;
        console.log(response);
        if (serverError) {
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
          
        }
      }

      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al actualizar la información de la usuario:", error);
    }
  };

  return (
    /*<Container {...props}>
      <UntitledComponent1Stack>
        <Rect>
          <TitleText>Editar usuario</TitleText>
        </Rect>
        <NombreUserEdicionBox user_name={userName} />
      </UntitledComponent1Stack>
      <CorreoUserEditarBox
        style={{ width: "100%" }}
        value={userCorreo}
        onChange={handleUserCorreoChange}
      />
      {emailError && <div style={{ color: "red" }}>{emailError}</div>}
      <MaterialButtonViolet2Row>
        <AceptarButton style={{ width: "48%" }} onClick={handleSubmit} />
        <CancelarButton history={props.history} style={{ width: "48%", marginLeft: "4%" }} />
      </MaterialButtonViolet2Row>
    </Container>*/
    <CardComponente titulo={"Editar usuario"}>
      <FormContainer>
      <NombreUserEdicionBox user_name={userName} />
      <CorreoUserEditarBox
        style={{ width: "100%" }}
        value={userCorreo}
        onChange={handleUserCorreoChange}
      />
      {emailError && <div style={{ color: "red" }}>{emailError}</div>}
      </FormContainer>
      <Row className="mx-auto text-center">
        <Col>
          <Button variant="primary" onClick={handleSubmit}>
            Aceptar
          </Button>
          <ButtonSeparator />
        </Col>
        <Col>
          <CancelarButton />
        </Col>
      </Row>
    </CardComponente>
  );
};

export default EditarUserBox;
