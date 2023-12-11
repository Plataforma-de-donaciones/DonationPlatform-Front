// SubirArchivoBox.js
import { useState } from "react";
import styled from "styled-components";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button, Form} from "react-bootstrap";


function SubirArchivoBox(props) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  
    if (typeof props.onChangeFile === 'function') {
      props.onChangeFile(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <>
      <Form.Group {...props} hidden controlId="formFile" className="mb-3">
        <Form.Control id="fileInput" onChange={handleFileChange} type="file" />
      </Form.Group>

      {selectedFile && (
        <>
          <Helper>Esta imagen se visualizará en la publicación.</Helper>
        </>
      )}

      <ButtonWrapper className="mx-auto">
        <Boton className="mt-3">
          <Button onClick={handleButtonClick}>
            <FaCloudUploadAlt />
            <SubirImagen>Subir imagen</SubirImagen>
          </Button>
        </Boton>
      </ButtonWrapper>
    </>
  );
}

const Container = styled.div`
 // display: flex;
 // flex-direction: column;
 // position: relative;
`;

const ButtonWrapper = styled.div`
 // display: flex;
 // align-items: center;
 // cursor: pointer;
`;

const Boton = styled.div`
  color: rgba(79, 181, 139, 1);
  font-size: 25px;
  margin-right: 8px;
`;

const SubirImagen = styled.span`
  font-size: 1.1rem;
  text-align: center;
  color: #FFFFFF;
  font-style: arial;
  font-weight: 500;
  margin-left: 0.6rem;
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
