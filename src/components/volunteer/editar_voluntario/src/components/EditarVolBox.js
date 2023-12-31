import { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import '../../../../generales/src/assets/estilos.css'
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import CardComponente from "../../../../generales/card/CardComponente";
import {Button, Card, CardHeader, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import NombreDonEdicionBox from "../../../../generales/src/components/NombreDonEdicionBox";
import DescripcionDonEditarBox from "../../../../generales/src/components/DescripcionDonEditarBox";
import TipodePublicacionBox from "../../../../generales/src/components/TipodePublicacionBox";
import LocalidadBox from "../../../../generales/src/components/LocalidadBoxEditar";
import { useAuth } from "../../../../../AuthContext";
import { useLocation } from "react-router-dom";


const cookies = new Cookies();

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

const EditarVolBox = (props) => {
  const [datosVoluntario, setDatosVoluntario] = useState({});
  const [volName, setVolName] = useState("");
  const [volDescription, setVolDescription] = useState("");
  const [volType, setVolType] = useState("");
  const [volZone, setVolZone] = useState("");
  const token = cookies.get("token");
  const [file, setFile] = useState(null);
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  //const { vol_id } = useParams();
  
  const { itemId, setItemId } = useAuth();
  console.log(itemId);
  const location = useLocation();
  const [rutaAnterior, setRutaAnterior] = useState(null);
 

  useEffect(() => {
    setRutaAnterior(location.state?.rutaAnterior);
    console.log(rutaAnterior);
    
  }, [location.search, history]);

  useEffect(() => {
    const cargarDatosVoluntario = async () => {
      try {
        const response = await instance.post(
          "/volunteers/searchbyid/",
          { vol_id: itemId },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const volunteer = response.data[0];
        setDatosVoluntario(volunteer);
        setVolName(volunteer.vol_name);
        setVolDescription(volunteer.vol_description);
        setVolType(volunteer.type);
        setVolZone(volunteer.zone);
      } catch (error) {
        console.error("Error al cargar datos de la donacion:", error);
      }
    };

    if (itemId) {
      cargarDatosVoluntario();
    }
  }, [itemId, token]);

  const handleVolNameChange = (e) => {
    setVolName(e.target.value);
  };

  const handleVolDescriptionChange = (e) => {
    setVolDescription(e.target.value);
  };

  const handleVolTypeChange = (selectedType) => {
    setVolType(selectedType);
  };

  const handleVolZoneChange = (e) => {
    if (e && e.target && e.target.value) {
      setVolZone(e.target.value);
    }
  };

  const setVolZoneValue = (newVolZone) => {
    setVolZone(newVolZone);
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
        `/volunteers/${itemId}/`,
        {
          vol_name: volName,
          vol_description: volDescription,
          type: volType,
          zone: volZone,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Editado correctamente!",
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
        <Card.Header className="text-center h5">Edita el voluntariado</Card.Header>
        <Card.Body>
          <Form validated={validated} onSubmit={handleSubmit}>

            <NombreDonEdicionBox
              style={{ width: "100%" }}
              value={volName}
              onChange={handleVolNameChange}
            />

            <DescripcionDonEditarBox
              style={{ width: "100%" }}
              value={volDescription}
              onChange={handleVolDescriptionChange}
            />
            <TipodePublicacionBox defaultValue={volType}></TipodePublicacionBox>
            
            <LocalidadBox donZone={volZone} onChange={setVolZone} />


            <div className="d-flex justify-content-center gap-4">
                <Button style={{ width: "38%" }} onClick={handleSubmit} className="btn-primary-forms">
                  Aceptar
                </Button>
                <Button
                  history={props.history}
                  onClick={handleCancel}
                  variant="secondary"
                >
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

export default EditarVolBox;