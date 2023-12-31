import { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";
import { Form} from "react-bootstrap";

const Container = styled.div`
  display: flex;
  background-color: transparent;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  font-style: normal;
  font-weight: 700;
`;

const SelectStyle = styled.select`
  border-bottom-width: 1px;
  border-color: #d9d5dc;
  color: #000;
  font-size: 14px;
  align-self: stretch;
  line-height: 16px;
  padding-top: 8px;
  flex: 1 1 0%;
  padding-bottom: 8px;
  width: 375px;
`;

const Helper = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
`;
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

function LocalidadBox({ onSelect }) {
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const token = cookies.get("token");

  useEffect(() => {
    // Cargar las zonas desde http://192.168.1.14/articleszones/ utilizando Axios
    instance
      .get("/articleszones/", {
        headers: {
          Authorization: `Token ${token}`, 
        },
      })
      .then((response) => {
        setZones(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las zonas:", error);
      });
  }, []);

  const handleZoneChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedZone(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <Form.Group className="mb-3" controlId="validationCustom01">
    <Form.Label>¿En qué localidad se encuentra? *</Form.Label>

      <Form.Select
        required
        value={selectedZone}
        onChange={handleZoneChange}
        aria-label="Default select example"
      >
        <option value="" disabled>
          Seleccione una localidad
        </option>
        {zones.map((zone) => (
          <option key={zone.zone_id} value={zone.zone_id}>
            {zone.zone_name}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback required type="invalid">
        Por favor ingrese la localidad, no puede estar vacía.
        </Form.Control.Feedback>
        <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
        <HelperText>Este dato se visualiza en la publicación.</HelperText>
      
    </Form.Group>
  );
}

export default LocalidadBox;
