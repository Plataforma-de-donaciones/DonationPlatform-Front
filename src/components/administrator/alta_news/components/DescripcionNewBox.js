import { Col, Form } from "react-bootstrap";

function DescripcionNewBox(props) {
  return (
    <Form.Group {...props} as={Col} md="12" controlId="validationCustom01">
      <Form.Label>Descripción de la noticia: *</Form.Label>

      <Form.Control
        required
        type="text"
        placeholder="Descripción de la noticia"
      />

      <Form.Control.Feedback type="invalid">
        Por favor digite el título de la noticia
      </Form.Control.Feedback>
      <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
    </Form.Group>
  );
}

export default DescripcionNewBox;
