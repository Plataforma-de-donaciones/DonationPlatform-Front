import { Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";

const ConversationCard = ({ conversacion, userId }) => {
  const { conversationId, setConversationId } = useAuth();
  const history = useHistory();

  const otroUsuario =
    userId === conversacion.user_1_info.user_id
      ? conversacion.user_2_info
      : conversacion.user_1_info;
  const handleOpenConversation = () => {
        setConversationId(conversacion.conv_id);
        console.log(conversationId);
        history.push("/conversaciones");
      };
  return (
    <>
      <Card className="mb-2">
        <span>{`Chat con ${otroUsuario.user_name}`}</span>
        <div className="m-2">
        {/* Usa el botón sin el componente Link */}
        <Button onClick={handleOpenConversation}>Abrir Conversación</Button>
      </div>
      </Card>
    </>
  );
};

export default ConversationCard;
