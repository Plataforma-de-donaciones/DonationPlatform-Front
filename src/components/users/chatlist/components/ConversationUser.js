import { useEffect, useState } from "react";
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";
import ConversationCard from "./ConversationCard";
import CardComponente from "../../../generales/card/CardComponente";

const ConversationUser = () => {
  const [conversaciones, setConversaciones] = useState([]);
  const cookies = new Cookies();
  const userData = cookies.get("user_data");
  const userId = userData.user_id;

  useEffect(() => {
    const obtenerConversacionesUsuario = async () => {
      try {
        const token = cookies.get("token");
        const response = await instance.post(
          "/conversations/searchbyuser/",
          {
            search: userId,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        
        setConversaciones(response.data);
      } catch (error) {
        console.error(
          "Error al obtener las conversaciones del usuario:",
          error
        );
      }
    };

    obtenerConversacionesUsuario();
  }, [userId]);

  return (
    <CardComponente titulo={"Mis conversaciónes"}>
      <div className="mx-auto text-center">
        {conversaciones.map((conversacion) => (
          <div key={conversacion.id}>
            <ConversationCard
              key={conversacion.id}
              conversacion={conversacion}
              userId={userId}
            />
          </div>
        ))}
      </div>
    </CardComponente>
  );
};

export default ConversationUser;
