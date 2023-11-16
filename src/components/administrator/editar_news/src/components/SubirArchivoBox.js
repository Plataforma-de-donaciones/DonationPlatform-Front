// SubirArchivoBox.js

import React, { useState } from "react";
import styled from "styled-components";
import Explorebutton from "./Explorebutton";
import { FaCloudUploadAlt } from "react-icons/fa";

function SubirArchivoBox(props) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  
    // Verifica si props.onChangeFile es una función antes de llamarla
    if (typeof props.onChangeFile === 'function') {
      props.onChangeFile(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <Container {...props}>
      <ButtonWrapper>
        <Button onClick={handleButtonClick}>
          <FaCloudUploadAlt />
        </Button>
        <SubirImagen>Subir imagen</SubirImagen>
      </ButtonWrapper>
      <InputStyle
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <>
          <PreviewImage src={URL.createObjectURL(selectedFile)} alt="Preview" />
          <Helper>Esta imagen se visualizará en la publicación.</Helper>
        </>
      )}
      <Explorebutton />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Button = styled.div`
  color: rgba(255, 152, 0, 1);
  font-size: 25px;
  margin-right: 8px;
`;

const SubirImagen = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  font-style: normal;
  font-weight: 700;
`;

const InputStyle = styled.input`
  display: none;
`;

const Helper = styled.span`
  font-size: 10px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 8px;
`;

const PreviewImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-top: 8px;
`;

export default SubirArchivoBox;
