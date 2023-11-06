import React, { useState, useEffect } from "react";
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";

const ChatComponent = ({ convId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const cookies = new Cookies();
  const user_id = cookies.get("user_data").user_id;

  useEffect(() => {
    const cargarMensajes = async () => {
      try {
        const token = cookies.get("token");

        const response = await instance.post("/chats/searchbyconv/", {
          search: convId,
        }, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          console.error("La respuesta de la API no es un array:", response.data);
        }
      } catch (error) {
        console.error("Error al cargar los mensajes:", error);
      }
    };

    cargarMensajes();
  }, [convId, cookies]);

  const messageStyle = {
    borderRadius: "4px",
    padding: "8px",
    marginBottom: "8px",
    maxWidth: "70%", // Limita el ancho del mensaje
  };

  const messageRightStyle = {
    ...messageStyle,
    backgroundColor: "#007bff",
    color: "white",
    alignSelf: "flex-end",
  };

  const messageLeftStyle = {
    ...messageStyle,
    backgroundColor: "#e5e5ea",
    color: "black",
    alignSelf: "flex-start",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const sent_date = new Date().toISOString();

    try {
      const token = cookies.get("token");

      const response = await instance.post("/chats/", {
        user: user_id,
        conv: convId,
        content: message,
        sent_date: sent_date,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setMessages([...messages, ...response.data]);
      } else {
        console.error("La respuesta de la API al enviar el mensaje no es un array:", response.data);
      }

      setMessage("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <div>
      <div className="chat-messages">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              style={msg.user === user_id ? messageRightStyle : messageLeftStyle}
            >
              {msg.content}
            </div>
          ))
        ) : (
          <div>No hay mensajes disponibles</div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ChatComponent;
