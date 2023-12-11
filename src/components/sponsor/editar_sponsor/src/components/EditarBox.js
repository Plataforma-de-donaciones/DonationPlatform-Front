import { useState, useEffect} from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import LocalidadBox from "../../../../generales/src/components/LocalidadBoxEditar";
import TipodePublicacionBox from "../../../../generales/src/components/TipodePublicacionBox";
import DescripcionDonEditarBox from "../../../../generales/src/components/DescripcionDonEditarBox";
import NombreDonEdicionBox from "../../../../generales/src/components/NombreDonEdicionBox";
import { Row, Col, Button, Form } from "react-bootstrap";
import CardComponente from "../../../../generales/card/CardComponente";
import { useAuth } from "../../../../../AuthContext";
import { useLocation } from 'react-router-dom';


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
  //const { sponsor_id } = useParams();

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

//url:editarsponsor/27

  return (
    <>
    
  
    <CardComponente
        titulo={"Editar padrino"}
        body={
          <>
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
<p></p>
            <TipodePublicacionBox defaultValue={sponsorType}></TipodePublicacionBox>
<p></p>
            <LocalidadBox donZone={sponsorZone} onChange={setSponsorZone} />


            <Row className="text-center mt-4">
              <Col>
                <Button style={{ width: "38%" }} onClick={handleSubmit}>
                  Aceptar
                </Button>
              </Col>

              <Col>
                <Button
                  history={props.history}
                  style={{ width: "38%", marginLeft: "4%" }}
                  onClick={handleCancel}
                  variant="secondary"
                >
                  Volver
                </Button>
              </Col>
            </Row>

            {/* Mover la pregunta de eliminar y el botón al final */}

            <Form validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3"></Row>
            </Form>
          </>
        }
      ></CardComponente>
    </>


  );
};

export default EditarBox;