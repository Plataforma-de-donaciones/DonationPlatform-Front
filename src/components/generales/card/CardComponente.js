import { Card, CardBody, CardFooter, CardHeader } from "react-bootstrap";

const CardComponente = ({ titulo, body, footer }) => {
  return (
    <>
      <Card className="mt-4">
        {titulo && <CardHeader className="text-center">{titulo}</CardHeader>}
        <CardBody>{body}</CardBody>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </>
  );
};

export default CardComponente;
