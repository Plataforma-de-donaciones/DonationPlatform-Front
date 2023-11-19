import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ConversationCard = ({ conversacion, userId }) => {
  const otroUsuario =
    userId === conversacion.user_1_info.user_id
      ? conversacion.user_2_info
      : conversacion.user_1_info;

  return (
    <>
      <Card className="mb-2">
        <span>{`Chat con ${otroUsuario.user_name}`}</span>
        <Link className="m-2" to={`/conversaciones/${conversacion.conv_id}`}>
          <Button>Abrir Conversación</Button>
        </Link>
      </Card>
    </>
  );
};

export default ConversationCard;
