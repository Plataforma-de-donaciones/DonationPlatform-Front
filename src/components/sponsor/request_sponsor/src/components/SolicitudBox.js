import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TituloLine from "./TituloLine";
import MotivoDeSolicitudBox from "./MotivoDeSolicitudBox";
import NombreSolicitudBox from "./NombreSolicitudBox";
import TeryCondCheckbox from "./TeryCondCheckbox";
import MaterialButtonWithShadow from "./MaterialButtonWithShadow";
import MaterialButtonViolet from "./MaterialButtonViolet";
import LocalidadBox from "./LocalidadBox";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import { useHistory, useParams } from "react-router-dom";
import CancelarButton from "./CancelarButton";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { Form } from "react-bootstrap";

const Container = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 1);
  flex-direction: column;
`;

const LoremIpsum1 = styled.span`
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  margin-top: 5px;
`;

const TituloLineContainer = styled.div`
  width: 100%;
  height: 35px;
  margin-top: 15px;
  position: relative;
  background-color: rgba(255, 152, 0, 0.5);
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const ButtonContainer = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonSeparator = styled.div`
  width: 10px; /* Espacio entre los botones */
`;

const cookies = new Cookies();

const SolicitudBox = (props) => {
  const { sponsorId } = useParams();
  const [solicitudData, setSolicitudData] = useState({
    req_name: "",
    req_description: "",
    zone: null,
    accept_terms: false,
    user: null,
    eq: null,
    don: null,
    vol: null,
    sponsor: null,
    req_sent_date: new Date().toISOString(),
    has_confirmation: false,
    confirmed_at: null,
    state: 1,
    type: 2,
  });

  const [errors, setErrors] = useState({});
  const token = cookies.get("token");
  const [user_id, setUserId] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [validated, setValidated] = useState(false);

  const history = useHistory();
  useEffect(() => {
    const userDataCookie = cookies.get("user_data");
    if (userDataCookie) {
      setUserId(userDataCookie.user_id);
    }
    setSolicitudData((prevData) => ({
      ...prevData,
      user: user_id || "",
      sponsor: sponsorId || "",
    }));
  }, [sponsorId, user_id]);

  const handleFieldChange = (fieldName, value) => {
    setSolicitudData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  const handleZoneSelect = (zoneId) => {
    setSolicitudData((prevData) => ({
      ...prevData,
      zone: zoneId,
    }));
  };

  const handleAcceptTermsChange = (isChecked) => {
    setSolicitudData((prevData) => ({
      ...prevData,
      accept_terms: isChecked,
    }));

    setAcceptTerms(isChecked);
  };

  const handleAccept = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const confirmation = await Swal.fire({
        title: "Protege tu Privacidad",
        html: `
          <p>Por su seguridad y la de los demás, le recordamos evitar publicar fotos y/o videos, o descripción en la publicación que contengan información personal o la de otras personas. Estos pueden incluir Nombre, Teléfono, Dirección, entre otros.</p>
          <p>En caso de necesitar brindar datos personales para concretar el acto benéfico, le sugerimos que lo realice de manera segura mediante el chat privado.</p>
          <p>Ayuda a crear un entorno en línea seguro para todos.</p>
          <p>¡Gracias por su colaboración!</p>
          <p>¿Usted confirma que esta publicación no incluye contenido que revele información sensible?</p>`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

      if (confirmation.isConfirmed) {
        try {
          const response = await instance.post("/requests/", solicitudData, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (response.status === 201) {
            Swal.fire(
              "Solicitud de apadrinamiento registrada correctamente!",
              "",
              "success"
            );
            history.push("/listadoapadrinamiento");
          } else {
          }
        } catch (error) {
          console.error("Error al crear solicitud:", error);
        }
      }
    }

    setValidated(true);

    Object.keys(solicitudData).forEach((name) => {
      validateField(name, solicitudData[name]);
    });

    if (!solicitudData.accept_terms) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        accept_terms: "Debe aceptar los términos",
      }));
      return;
    }
  };

  const validateField = (fieldName, value) => {
    if (
      fieldName === "req_description" &&
      (!value || !value.toString().trim())
    ) {
      toast.error("Por favor, complete los campos requeridos", {
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
        [fieldName]: "La descripción del motivo no puede estar vacía",
      }));
    }
  };
  const handleCancel = () => {
    Swal.fire({
      title: "¿Está seguro que desea cancelar?",
      icon: "question",
      iconHtml: "?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/listadoapadrinamiento");
      }
    });
  };

  return (
    <Container {...props}>
      <TituloLineContainer>
        <TituloLine></TituloLine>
        <LoremIpsum1>Solicitud de padrino/a</LoremIpsum1>
      </TituloLineContainer>
      <MotivoDeSolicitudBox
        onChange={(event) =>
          handleFieldChange("req_description", event.target.value)
        }
      ></MotivoDeSolicitudBox>
      {errors.req_description && (
        <span style={{ color: "red" }}>{errors.req_description}</span>
      )}
      <LocalidadBox onSelect={handleZoneSelect}></LocalidadBox>
      {errors.zone && <span style={{ color: "red" }}>{errors.zone}</span>}
      <NombreSolicitudBox
        onChange={(event) => handleFieldChange("req_name", event.target.value)}
      ></NombreSolicitudBox>
      <Group>
        <Form.Check
          required
          label="Al enviar este formulario acepta los términos y condiciones"
          feedback="Es necesario leer y aceptar los términos"
          feedbackType="invalid"
        />
        {/* <TeryCondCheckbox
          checked={acceptTerms}
          onChange={() => handleAcceptTermsChange(!acceptTerms)}
        /> */}
        <MaterialButtonWithShadow></MaterialButtonWithShadow>
      </Group>
      {errors.accept_terms && (
        <span style={{ color: "red", marginTop: "5px" }}>
          {errors.accept_terms}
        </span>
      )}
      <ButtonContainer>
        <MaterialButtonViolet onClick={handleAccept}></MaterialButtonViolet>
        <ButtonSeparator />
        <CancelarButton onClick={handleCancel} />
      </ButtonContainer>
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
      {/* Same as */}
      <ToastContainer />
    </Container>
  );
};

export default SolicitudBox;
