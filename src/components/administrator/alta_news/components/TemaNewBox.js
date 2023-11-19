import { Col, Form } from "react-bootstrap";

function TemaNewBox(props) {
  return (
    <Form.Group as={Col} md="12" controlId="validationCustom01">
      <Form.Label>Indique el tema de la noticia:</Form.Label>

      <Form.Control required type="text" placeholder="Tema de la noticia" />

      <Form.Control.Feedback type="invalid">
        Por favor digite el tema de la noticia
      </Form.Control.Feedback>
      <Form.Control.Feedback>¡Campo válido!</Form.Control.Feedback>
    </Form.Group>
  );
}

export default TemaNewBox;
