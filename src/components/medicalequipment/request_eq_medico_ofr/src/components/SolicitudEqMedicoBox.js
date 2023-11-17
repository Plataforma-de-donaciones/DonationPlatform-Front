import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LocalidadBox from '../../../../volunteer/alta_voluntario/components/LocalidadBox';
import instance from '../../../../../axios_instance';
import Cookies from 'universal-cookie';
import { useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import CardComponente from './../../../../generales/card/CardComponente';
import { Button, Col, Form, Row } from 'react-bootstrap';

const HelperText = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
  font-style: normal;
  font-weight: 400;
`;

const cookies = new Cookies();

const SolicitudEqMedicoBox = (props) => {
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
  const [validated, setValidated] = useState(false);
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

  const handleAccept = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      try {
        const response = await instance.post('/requests/', solicitudData, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
  
        if (response.status === 201) {
          Swal.fire(
            'Ofrecimiento registrado correctamente!',
            '',
            'success'
          )
          history.push('/listadoequipamiento');
        } else {
          // Manejar otros casos de respuesta si es necesario
        }
      } catch (error) {
        console.error('Error al crear solicitud:', error);
      }

    }
    setValidated(true);

    // Validar todos los campos antes de enviar la solicitud
    Object.keys(solicitudData).forEach((name) => {
      validateField(name, solicitudData[name]);
    });


    // Verificar si se aceptaron los términos
    if (!solicitudData.accept_terms) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        accept_terms: 'Debe aceptar los términos',
      }));
      return;
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
        [fieldName]: "",
      }));
    }

    // Agrega otras validaciones según sea necesario
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
        history.push('/listadoequipamiento');
      }
    });
  };
//url:donarequipamiento/id
  return (
<>
      <CardComponente
        titulo={"Donación de equipamiento médico"}
        body={
          <>
            <Form noValidate validated={validated} onSubmit={handleAccept}>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>
                  Describa que es lo que puede donar *{" "}
                  </Form.Label>

                  <Form.Control
                    as="textarea"
                    value={solicitudData["req_description"]}
                    required
                    type="text"
                    placeholder="Describa la donación"
                    onChange={(event) =>
                      handleFieldChange("req_description", event.target.value)
                    }
                    maxlength={250}
                    minLength={3}
                  />

                  <Form.Control.Feedback type="invalid">
                    La descripción de no puede estar vacía
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Campo válido!</Form.Control.Feedback>
                  <HelperText>
                    Este dato se visualiza únicamente por el donatario.
                    Asimismo, indique las condiciones del voluntariado.
                  </HelperText>
                </Form.Group>

                <p></p>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <LocalidadBox onSelect={handleZoneSelect} />
                  {errors.zone && (
                    <span style={{ color: "red" }}>{errors.zone}</span>
                  )}

                  <Form.Control.Feedback type="invalid">
                    Localidad requerida
                  </Form.Control.Feedback>

                  <Form.Control.Feedback>Campo válido!</Form.Control.Feedback>

                  <HelperText>
                    Este dato se visualiza en la publicación.
                  </HelperText>
                </Form.Group>
                <p></p>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>¿Cuál es su nombre? *</Form.Label>

                  <Form.Control
                    value={solicitudData["req_name"]}
                    type="text"
                    required
                    placeholder="Ingrese su nombre"
                    onChange={(event) =>
                      handleFieldChange("req_name", event.target.value)
                    }
                    maxlength={50}
                    minLength={3}
                  />
                  <HelperText>
                    Este dato se visualiza únicamente por el donatario.
                  </HelperText>
                </Form.Group>
                <p></p>
                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    label="Al enviar este formulario acepta los términos y condiciones"
                    feedback="Es necesario leer y aceptar los términos"
                    feedbackType="invalid"
                  />
                </Form.Group>
              </Row>

              <Row className="text-center">
                <Col>
                  <Button style={{ width: "30%" }} type="submit">
                    Aceptar
                  </Button>
                </Col>
                <Col>
                  <Button
                    style={{ width: "30%" }}
                    variant="secondary"
                    onClick={handleCancelarClick}
                  >
                    Cancelar
                  </Button>
                </Col>
              </Row>
              <div className="text-center mx-auto"></div>
            </Form>
          </>
        }
      ></CardComponente>

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
    </>
  );
};

export default SolicitudEqMedicoBox;
