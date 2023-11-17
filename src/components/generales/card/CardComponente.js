import { Card, CardBody, CardFooter, CardHeader } from "react-bootstrap";

const CardComponente = ({ titulo, body, footer, isTable }) => {
  const estilo = !isTable ? "mt-4  w-50 mx-auto" : "mt-4 mx-auto";
  return (
    <>
      <Card className={estilo}>
        {titulo && <CardHeader className="text-center">{titulo}</CardHeader>}
        <CardBody>{body}</CardBody>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </>
  );
};

export default CardComponente;
