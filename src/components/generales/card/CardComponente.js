import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
} from "react-bootstrap";

const CardComponente = ({ titulo, children, body, footer, isTable }) => {
  const estilo = !isTable ? "w-50 mx-auto" : "h-100 mx-auto";

  return (
    <>
      <Row>
        <Col>
          <Card className={estilo}>
            {titulo && (
              <CardHeader className="text-center">{titulo}</CardHeader>
            )}
            <CardBody>
              {body}
              {children}
            </CardBody>
            {footer && <CardFooter>{footer}</CardFooter>}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CardComponente;
