import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TituloLine from "./TituloLine";
import NombreDonBox from "./NombreDonBox";
import DescripcionDonBox from "./DescripcionDonBox";
import TipodePublicacionBox from "./TipodePublicacionBox";
import LocalidadBox from "./LocalidadBox";
import SubirArchivoBox from "./SubirArchivoBox";
import AceptarButton from "./AceptarButton";
import CancelarButton from "./CancelarButton";
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';


const Container = styled.div`
  background-color: rgba(255, 255, 255, 1);
  min-height: 70vh;
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

const TitleContainer = styled.div`
  position: relative;
  background-color: rgba(255, 152, 0, 0.5);
`;

const Title = styled.h2`
  font-size: 20px;
  color: #121212;
  font-weight: 700;
  margin: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
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

const LoremIpsum = styled.span`
  left: 53px;
  position: absolute;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  font-size: 20px;
  top: 5px;
`;

const UntitledComponent1Stack = styled.div`
  width: 400px;
  height: 35px;
  margin-top: 15px;
  position: relative;
`;

const cookies = new Cookies();

const DonacionBox = (props) => {
  const [donationData, setDonationData] = useState({
    don_name: "",
    don_description: "",
    type: "",
    state: 1,
    don_created_at: new Date().toISOString(),
    user: "", 
    zone: null,
    geom_point: null,
    has_requests: false,
    request_count: 0,
    don_attachment: null,
  });

  const [errors, setErrors] = useState({});
  const token = cookies.get("token");
  const [user_id, setUserId] = useState(null);
  const [file, setFile] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Obtener el user_id al montar el componente
    const userDataCookie = cookies.get("user_data");
    if (userDataCookie) {
      setUserId(userDataCookie.user_id);
    }
  }, []);

  useEffect(() => {
    // Sincronizar el user_id en el equipmentData
    setDonationData((prevData) => ({
      ...prevData,
      user: user_id || "",
    }));
  }, [user_id]);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleFieldChange = (fieldName, event) => {
    const value = event.target.value;

    setDonationData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    // Limpiar el error al cambiar el campo
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  const handleZoneSelect = (zoneId) => {
    setDonationData((prevData) => ({
      ...prevData,
      zone: zoneId,
    }));
  };

  const handleTipoPublicacionSelect = (selectedValue) => {
    console.log("Tipo de publicación seleccionado:", selectedValue);
    setDonationData((prevData) => ({
      ...prevData,
      type: selectedValue,
    }));
  };

  const validateField = (fieldName, value) => {

    if (fieldName === "don_name" && (!value || !value.toString().trim())) {
      toast.error('Por favor, complete los campos requeridos', {
        position: 'bottom-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "El nombre no puede estar vacío",
      }));
    }

    if (fieldName === "don_description" && (!value || !value.toString().trim())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "La descripción no puede estar vacía",
      }));
    }

    if (fieldName === "zone" && !value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "Debe seleccionar una localidad",
      }));
    }

    if (fieldName === "type" && !value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "Debe seleccionar un tipo de publicación",
      }));
    }

    // Agrega otras validaciones según sea necesario
  };

  const handleAccept = async () => {
    // Validar todos los campos antes de enviar la solicitud
    Object.keys(donationData).forEach((name) => {
      validateField(name, donationData[name]);
    });

    // Verificar si hay errores en los campos
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }
    const confirmation = await Swal.fire({
      title: 'Protege tu Privacidad',
      html: `
        <p>Por su seguridad y la de los demás, le recordamos evitar publicar fotos y/o videos, o descripción en la publicación que contengan información personal o la de otras personas. Estos pueden incluir Nombre, Teléfono, Dirección, entre otros.</p>
        <p>En caso de necesitar brindar datos personales para concretar el acto benéfico, le sugerimos que lo realice de manera segura mediante el chat privado.</p>
        <p>Ayuda a crear un entorno en línea seguro para todos.</p>
        <p>¡Gracias por su colaboración!</p>
        <p>¿Usted confirma que esta publicación no incluye contenido que revele información sensible?</p>`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    });
   if(confirmation.isConfirmed){
    try {
      // Crear un objeto FormData para enviar archivos
      const formData = new FormData();
      formData.append("don_attachment", file);

      // Agregar otros campos al formData
      Object.entries(donationData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      console.log("Contenido de FormData:");
      const formDataEntries = [...formData.entries()];
      console.log(formDataEntries);

      // Enviar la solicitud con el formData
      const response = await instance.post("/donations/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data", // Asegura el tipo de contenido correcto
        },
      });

      if (response.status === 201) {
        Swal.fire(
          'Donación registrada correctamente!',
          '',
          'success'
        )
        history.push('/listadodonacion');
      } else {
        const serverError = response.data;
        console.log(response);
        if (serverError) {
          // Manejar errores específicos del servidor si es necesario
        } else {
          // Manejar otros errores
        }
      }
    } catch (error) {
      console.error("Error al registrar equipo médico:", error);
      console.log("Respuesta del servidor:", error.response); // Agrega esta línea
      // Manejar errores de la solicitud
    }
    }
  };
  const handleCancel = () => {
    Swal.fire({
      title: '¿Está seguro que desea cancelar?',
      icon: 'question',
      iconHtml: '?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        history.push('/listadodonacion');
      }
    });
  };

  return (
    <Container {...props}>
      <UntitledComponent1Stack>
        <TituloLine
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 35,
            width: 400,
            backgroundColor: "rgba(255,152,0,1)",
            opacity: 0.5
          }}
        ></TituloLine>
        <LoremIpsum>Registra tu Donación</LoremIpsum>
      </UntitledComponent1Stack>
      <FormContainer>
        <NombreDonBox
          onChange={(event) => handleFieldChange("don_name", event)}
        />
        {errors.don_name && <span style={{ color: "red" }}>{errors.don_name}</span>}
        <DescripcionDonBox
          onChange={(event) => handleFieldChange("don_description", event)}
        />
        {errors.don_description && <span style={{ color: "red" }}>{errors.don_description}</span>}
        <TipodePublicacionBox onSelect={handleTipoPublicacionSelect} />
        {errors.type && <span style={{ color: "red" }}>{errors.type}</span>}
        <LocalidadBox onSelect={handleZoneSelect} />
        {errors.zone && <span style={{ color: "red" }}>{errors.zone}</span>}
        {/* Agrega un mensaje de error para la localidad si es necesario */}
        <SubirArchivoBox onChangeFile={(file) => handleFileChange(file)} />
      </FormContainer>
      <ButtonContainer>
        <AceptarButton onClick={handleAccept} />
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

export default DonacionBox;
