import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const ImagenUploader = ({ onFileChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileChange(file);
  };

  return (
    <Form.Group controlId="attachments">
      <Form.Label>Adjuntos (Imágenes)</Form.Label>
      <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
    </Form.Group>
  );
};

export default ImagenUploader;
