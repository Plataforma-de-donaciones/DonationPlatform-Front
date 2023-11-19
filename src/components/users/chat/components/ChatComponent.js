import { useState, useEffect } from "react";
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";
import { Card, Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

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
    left: "-12px",
    borderBottom: "20px solid transparent",
    borderRight: "20px solid #5a99ee"
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
    <>
      <Row>
        <Col>
          <Card className='m-5'>
            <Card.Header className="text-center h5">
              Chat
            </Card.Header>
            <Card.Body>
              <ul class="chat-list">
                {Array.isArray(messages) && messages.length > 0 ? (
                  messages.map((msg) => (
                    <li
                      key={msg.id}
                      className={msg.user === user_id ? 'out' : 'in'}
                    >
                      <div className="chat-body">
                        <div className="chat-message">
                          <h5>{msg.user === user_id ? 'Enviado' : 'Recibido'}</h5>
                          <p>
                            {msg.content}
                          </p>
                        </div>

                      </div>
                    </li>
                  ))
                ) : (
                  <div>No hay mensajes disponibles</div>
                )}
              </ul>

            </Card.Body>
            <Card.Footer className="text-center">
              <form onSubmit={handleSubmit}>
                <InputGroup className="mb-3 mt-3">
                  <Form.Control
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                  />
                  
                  <Button type="submit"  id="button-addon2">
                    Enviar
                  </Button>

                </InputGroup>
               
              </form>

            </Card.Footer>
          </Card >
        </Col >
      </Row >
    </>

  );
};

export default ChatComponent;
