import { useState, useEffect } from "react";
import styled from "styled-components";
import NombreNewBox from "./NombreNewBox";
import DescripcionNewBox from "./DescripcionNewBox";
import TemaNewBox from "./TemaNewBox";
import SubirArchivoBox from "../../../generales/src/components/SubirArchivoBox";
import CancelarButton from "./CancelarButton";
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";
import CardComponente from "../../../generales/card/CardComponente";
import { Button, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import ImagenDonEditarBox from "../../../generales/src/components/ImagenDonEditarBox";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const ButtonSeparator = styled.div`
  width: 10px;
`;

const cookies = new Cookies();

const NewBoxMod = (props) => {
  const [newData, setNewData] = useState({
    new_name: "",
    new_description: "",
    new_subject: "",
    new_created_at: new Date().toISOString(),
    user: "",
    is_highlighted: false,
    views_count: 0,
    attachments: null,
  });

  const [errors, setErrors] = useState({});
  const token = cookies.get("token");
  const [user_id, setUserId] = useState(null);
  const [file, setFile] = useState(null);
  const history = useHistory();


  useEffect(() => {
    const userDataCookie = cookies.get("user_data");
    if (userDataCookie) {
      setUserId(userDataCookie.user_id);
    }
  }, []);

  useEffect(() => {
    setNewData((prevData) => ({
      ...prevData,
      user: user_id || "",
    }));
  }, [user_id]);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleFieldChange = (fieldName, event) => {
    const value = event.target.value;

    setNewData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  const handleZoneSelect = (zoneId) => {
    setNewData((prevData) => ({
      ...prevData,
      zone: zoneId,
    }));
  };

  const validateField = (fieldName, value) => {
    if (fieldName === "new_name" && (!value || !value.toString().trim())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "El nombre no puede estar vacío",
      }));
    } else if (fieldName === "new_name" && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }
    if (
      fieldName === "new_description" &&
      (!value || !value.toString().trim())
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "La descripción no puede estar vacía",
      }));
    } else if (fieldName === "new_description" && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }
  };

  const handleAccept = async () => {
    Object.keys(newData).forEach((name) => {
      validateField(name, newData[name]);
    });

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    try {
      const formData = new FormData();
      if (file) {
        formData.append("attachments", file);
      }
      Object.entries(newData).forEach(([key, value]) => {
        if (key !== "attachments") {
          formData.append(key, value);
        }
      });
      const formDataEntries = [...formData.entries()];

      const response = await instance.post("/news/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        Swal.fire("¡Noticia registrada correctamente!", "", "success");
        history.push("/listadonoticiasmod");
        console.log(response.data);
       
      } else {
        const serverError = response.data;
        console.log(response);
        if (serverError) {
        } else {
        }
      }
    } catch (error) {
      console.error("Error al registrar la noticia:", error);
      console.log("Respuesta del servidor:", error.response);
    }
  };

  return (
    <CardComponente className="card-alta" titulo={"Crear noticia"}>
      <FormContainer>
        <NombreNewBox
          onChange={(event) => handleFieldChange("new_name", event)}
        />
        {errors.new_name && (
          <span style={{ color: "red" }}>{errors.new_name}</span>
        )}
        <DescripcionNewBox
          onChange={(event) => handleFieldChange("new_description", event)}
        />
        {errors.new_description && (
          <span style={{ color: "red" }}>{errors.new_description}</span>
        )}
        <TemaNewBox
          onChange={(event) => handleFieldChange("new_subject", event)}
        />
        <ImagenDonEditarBox
                  className="text-center"
                  style={{ width: "20%" }}
                  handleFileChange={handleFileChange}
                  titulo={"Adjunte una imagen"}
                />
      </FormContainer>
      <Row className="mx-auto text-center">
        <Col>
          <Button variant="primary" onClick={handleAccept}>
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

export default NewBoxMod;
