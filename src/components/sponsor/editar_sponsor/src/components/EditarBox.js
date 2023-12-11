import { useState, useEffect} from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import '../../../../generales/src/assets/estilos.css'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory, useLocation } from 'react-router-dom';
import LocalidadBox from "../../../../generales/src/components/LocalidadBoxEditar";
import TipodePublicacionBox from "../../../../generales/src/components/TipodePublicacionBox";
import DescripcionDonEditarBox from "../../../../generales/src/components/DescripcionDonEditarBox";
import NombreDonEdicionBox from "../../../../generales/src/components/NombreDonEdicionBox";
import {Button, Card, CardHeader, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import CardComponente from "../../../../generales/card/CardComponente";
import { useAuth } from "../../../../../AuthContext";
import { urlBackendDev } from "../../../../generales/variables/constantes";
import Spinner from "react-bootstrap/Spinner";


const HelperText = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
  font-style: normal;
  font-weight: 400;
`;

const Row1 = styled(Row)`
  margin-bottom: 30px;
`;

const Col1 = styled(Col)`
  margin-bottom: 30px;
`;

const CardStyled = styled(Card)`
  margin-bottom: 30px; /* Ajusta el valor según la separación deseada */

  &.card-alta {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    border: 1px solid #ddd;
    width: 500px;
  }
`;

const cookies = new Cookies();



const EditarBox = (props) => {
  const [datosSponsor, setDatosSponsor] = useState({});
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorDescription, setSponsorDescription] = useState("");
  const [sponsorType, setSponsorType] = useState("");
  const [sponsorZone, setSponsorZone] = useState("");
  const token = cookies.get("token");
  const history = useHistory();
  const [validated, setValidated] = useState(false);

  const { itemId, setItemId } = useAuth();
  console.log(itemId);

  const location = useLocation();
  const [rutaAnterior, setRutaAnterior] = useState(null);
 

  useEffect(() => {
    setRutaAnterior(location.state?.rutaAnterior);
    console.log(rutaAnterior);
    
  }, [location.search, history]);

  const handleSponsorNameChange = (e) => {
    setSponsorName(e.target.value);
  };

  const handleSponsorDescriptionChange = (e) => {
    setSponsorDescription(e.target.value);
  };

  const handleSponsorTypeChange = (selectedType) => {
    setSponsorType(selectedType);
  };

  const handleSponsorZoneChange = (e) => {
    if (e && e.target && e.target.value) {
      setSponsorZone(e.target.value);
    }
  };

  const setSponsorZoneValue = (newSponsorZone) => {
    setSponsorZone(newSponsorZone);
  };

  const handleSubmit = async () => {
    const confirmation = await Swal.fire({
      title: "¿Está seguro que desea editar?",
      text: "cambiarán los campos que ha editado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Cancelar"
    });
    if(confirmation.isConfirmed){
    try {
      const response = await instance.patch(
        `/sponsors/${itemId}/`,
        {
          sponsor_name: sponsorName,
          sponsor_description: sponsorDescription,
          type: sponsorType,
          zone: sponsorZone,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      Swal.fire({
        title: "¡Editado correctamente!",
        text: "Los datos han sido editados",
        icon: "success"
      });

        history.push(rutaAnterior);

      console.log("Respuesta del servidor:", response.data);
      
    } catch (error) {
      console.error("Error al actualizar la información de la donación:", error);
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
          history.push(rutaAnterior);     
      }
    });
  };


  return (
    <main>
    <Row1 className="mt-4">
    <Col1>
      <CardStyled className="card-alta">
        <Card.Header className="text-center h5">Edita el apadrinamiento</Card.Header>
        <Card.Body>
          <Form validated={validated} onSubmit={handleSubmit}>

            <NombreDonEdicionBox
              style={{ width: "100%" }}
              value={sponsorName}
              onChange={handleSponsorNameChange}
            />

            <DescripcionDonEditarBox
              style={{ width: "100%" }}
              value={sponsorDescription}
              onChange={handleSponsorDescriptionChange}
            />

            <TipodePublicacionBox defaultValue={sponsorType}></TipodePublicacionBox>

            <LocalidadBox donZone={sponsorZone} onChange={setSponsorZone} />

            <div className="d-flex justify-content-center gap-4">
              <Button variant="primary" onClick={handleSubmit} className="btn-primary-forms">
                    Aceptar
              </Button>
              <Button history={props.history} onClick={handleCancel} variant="secondary">
                  Volver
              </Button>    
            </div>
            </Form>
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
          </Card.Body>
      </CardStyled>
    </Col1>
    </Row1>
    </main>
    );
};

export default EditarBox;