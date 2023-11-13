import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TituloLine from './TituloLine';
import MotivoDeSolicitudDonBox from './MotivoDeSolicitudDonBox';
import NombreDonSolicitudBox from './NombreDonSolicitudBox';
import TeryCondCheckbox from './TeryCondCheckbox';
import MaterialButtonWithShadow from './MaterialButtonWithShadow';
import MaterialButtonViolet from './MaterialButtonViolet';
import LocalidadBox from './LocalidadBox';
import instance from '../../../../../axios_instance';
import Cookies from 'universal-cookie';
import { useHistory, useParams } from 'react-router-dom';
import CancelarButton from './CancelarButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

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

const SolicitudDonBox = (props) => {
  const { equipamientoId } = useParams();
  const [solicitudData, setSolicitudData] = useState({
    req_name: '',
    req_description: '',
    zone: null,
    accept_terms: false,
    user: null,
    eq: null,
    don: null,
    vol: null,
    req_sent_date: new Date().toISOString(),
    has_confirmation: false,
    confirmed_at: null,
    state: 1,
    type: 2,
  });

  const [errors, setErrors] = useState({});
  const token = cookies.get('token');
  const [user_id, setUserId] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const history = useHistory(); 

  useEffect(() => {
    // Obtener el user_id y equipamientoId al montar el componente
    const userDataCookie = cookies.get('user_data');
    if (userDataCookie) {
      setUserId(userDataCookie.user_id);
    }
    // Asegurémonos de que equipamientoId está disponible
    setSolicitudData((prevData) => ({
      ...prevData,
      user: user_id || '', // Asegurarse de que user sea una cadena vacía si user_id es null
      eq: equipamientoId || '', // Asegurarse de que eq sea una cadena vacía si equipamientoId es null
    }));
  }, [equipamientoId, user_id]);

  const handleFieldChange = (fieldName, value) => {
    setSolicitudData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    // Limpiar el error al cambiar el campo
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
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

  const handleAccept = async () => {
    // Validar todos los campos antes de enviar la solicitud
    Object.keys(solicitudData).forEach((name) => {
      validateField(name, solicitudData[name]);
    });

    // Verificar si hay errores en los campos
    if (Object.values(errors).some((error) => error !== '')) {
      return;
    }

    // Verificar si se aceptaron los términos
    if (!solicitudData.accept_terms) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        accept_terms: 'Debe aceptar los términos',
      }));
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
      const response = await instance.post('/requests/', solicitudData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 201) {
        Swal.fire(
          'Solicitud creada correctamente!',
          '',
          'success'
        )
        history.push('/listadodonacion');
      } else {
        const serverError = response.data;
        console.log(response);
      }
    } catch (error) {
      console.error('Error al crear solicitud:', error);
    }
  }
  };

  const validateField = (fieldName, value) => {
    if (fieldName === "req_description" && (!value || !value.toString().trim())) {
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
        [fieldName]: "La descripción de la donación no puede estar vacía",
      }));
    }
  
    if (fieldName === "zone" && !value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "Debe seleccionar una localidad",
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
        history.push('/listadodonacion');
      }
    });
  };
  return (
    <Container {...props}>
      <TituloLineContainer>
        <TituloLine></TituloLine>
        <LoremIpsum1>Donaciones</LoremIpsum1>
      </TituloLineContainer>
      <MotivoDeSolicitudDonBox
        onChange={(event) => handleFieldChange('req_description', event.target.value)}
      ></MotivoDeSolicitudDonBox>
      {errors.req_description && <span style={{ color: "red" }}>{errors.req_description}</span>}
      <LocalidadBox onSelect={handleZoneSelect}></LocalidadBox>
      {errors.zone && <span style={{ color: "red" }}>{errors.zone}</span>}
      <NombreDonSolicitudBox
        onChange={(event) => handleFieldChange('req_name', event.target.value)}
      ></NombreDonSolicitudBox>
      <Group>
      <TeryCondCheckbox
  checked={acceptTerms}
  onChange={() => handleAcceptTermsChange(!acceptTerms)}
/>
        <MaterialButtonWithShadow></MaterialButtonWithShadow>
      </Group>
      {errors.accept_terms && (
        <span style={{ color: 'red', marginTop: '5px' }}>{errors.accept_terms}</span>
      )}
      <ButtonContainer>
      <MaterialButtonViolet onClick={handleAccept}></MaterialButtonViolet>
      <ButtonSeparator />
        <CancelarButton onClick={handleCancelarClick}/>
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

export default SolicitudDonBox;
