import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SubirArchivoBox from "./SubirArchivoBox";
import { Col, Row } from "react-bootstrap";

function ImagenDonEditarBox({ handleFileChange, donAttachment, titulo, ...props }) {
  const [previewImage, setPreviewImage] = useState(props.imagen);

  const handleFileChangeInParent = async (file) => {
    setPreviewImage(URL.createObjectURL(file));
    await handleFileChange(file);
  };

  return (
    <Container>
        <Imagen className="text-center mx-auto">{titulo}</Imagen>
        <Col>
          {previewImage && (
            <PreviewImage src={previewImage} alt={props.descripcion} />
          )}
          {!props.imagenCargando && (
            <SubirArchivoBoxWrapper>
              <SubirArchivoBox onChangeFile={handleFileChangeInParent} />
            </SubirArchivoBoxWrapper>
          )}
        </Col>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  // border-bottom-width: 1px;
  // border-color: #d9d5dc;
  // background-color: transparent;
  // flex-direction: column;
  // position: relative;
`;

const Imagen = styled.span`
  font-size: 12px;
  text-align: center;
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
  // position: relative;
  // left: 0;
  // bottom: 0;
  // width: 100%;
`;

export default ImagenDonEditarBox;
