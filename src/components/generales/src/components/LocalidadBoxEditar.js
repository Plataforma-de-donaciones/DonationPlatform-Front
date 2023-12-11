import { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";
import { Form} from "react-bootstrap";

const HelperText = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
  font-style: normal;
  font-weight: 400;
`;

const Container = styled.div``;

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

const cookies = new Cookies();

function LocalidadBox({ onChange, donZone, setDonZone }) {
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(0);
  const token = cookies.get("token");

  useEffect(() => {
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
  }, [token]);

  useEffect(() => {
    if (donZone) {
     
      setSelectedZone(donZone);
    } else if (zones.length > 0) {
     
      setSelectedZone(zones[0].zone_id);
    }
  }, [donZone, zones]);

  useEffect(() => {
    
    if (donZone && zones.length > 0) {
      setSelectedZone(donZone);
    }
  }, [donZone, zones]);

  const handleZoneChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedZone(selectedValue);
    if (onChange) {
      onChange(selectedValue);
      console.log(selectedValue, "VALOR DEL OPTION");
    }
    if (setDonZone && typeof setDonZone === "function") {
      setDonZone(selectedValue);
      console.log(donZone);
    }
  };

  return (
    <>
        <Form.Group className="mb-3" controlId="validationCustom01">
        <Form.Label>Su localidad: </Form.Label>

        <Form.Select
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
    </>
  );
}

export default LocalidadBox;
