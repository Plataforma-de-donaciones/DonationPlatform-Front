import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SubirArchivoBox from "./SubirArchivoBox";

function ImagenEveEditarBox({ handleFileChange, eveAttachment, ...props }) {
  const [previewImage, setPreviewImage] = useState(eveAttachment);

  const handleFileChangeInParent = async (file) => {
    setPreviewImage(URL.createObjectURL(file));
    await handleFileChange(file);
  };

  return (
    <Container {...props}>
      <Imagen>Imagen</Imagen>
      {previewImage && <PreviewImage src={previewImage} alt="Evento" />}
      <SubirArchivoBoxWrapper>
        <SubirArchivoBox onChangeFile={handleFileChangeInParent} />
      </SubirArchivoBoxWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #D9D5DC;
  background-color: transparent;
  flex-direction: column;
  position: relative;
`;

const Imagen = styled.span`
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
  font-style: normal;
  font-weight: 700;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  margin-top: 8px;
`;

const SubirArchivoBoxWrapper = styled.div`
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
`;

export default ImagenEveEditarBox;
