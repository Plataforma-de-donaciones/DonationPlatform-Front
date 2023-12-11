import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import chatbotLogo from './chatbot.png';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messageContainerRef = useRef(null);
  const bottomRef = useRef(null);
  const lastInteractionTimeRef = useRef(new Date());

  useEffect(() => {

    const disconnectAfterInactivity = () => {
      const currentTime = new Date();
      const inactiveTime = currentTime - lastInteractionTimeRef.current;

      if (isOpen && inactiveTime >= 5 * 60 * 1000) {
        setIsOpen(false);
        setMessages([]);
      }
    };

   
    const inactivityTimer = setInterval(disconnectAfterInactivity, 1000);

    return () => clearInterval(inactivityTimer);
  }, [isOpen]);

  useEffect(() => {
    lastInteractionTimeRef.current = new Date();
  }, [messages]);

  useEffect(() => {
    if (messageContainerRef.current) {
      if (bottomRef.current) {
        messageContainerRef.current.scrollTop = bottomRef.current;
        bottomRef.current = null; 
      } else {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      }
    }
  
    if (isOpen && messages.length === 0) {
      handleSendMessageWelcome();
    }
  }, [messages, isOpen]);

  const handleSendMessageWelcome = () => {
    setMessages([
      { text: 'Hola, bienvenido/a a la plataforma de donaciones. ¿En qué puedo ayudarte?', sender: 'bot' },
    ]);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim() !== '') {
      const newUserMessage = { text: inputText, sender: 'user' };
      const newMessages = [...messages, newUserMessage];
      setMessages(newMessages);
  
      if (messages.length === 0) {
        handleSendMessageWelcome();
      } else { 
        const witAiResponse = await analyzeIntent(inputText);
  
        if (witAiResponse && witAiResponse.intents && witAiResponse.intents.length > 0) {
            
            const intent = witAiResponse.intents[0].name;
    
            switch (intent) {

              case 'donacion':
                const donationResponse = 'Para ofrecer o solicitar una donación, debe dirigirse a la sección "Donaciones". Allí podrá visualizar un listado de solicitudes y ofrecimientos. Haga clic en el botón "Agregar donación" para cargarla.';
                setMessages([...messages, { text: donationResponse, sender: 'bot' }]);
                break;

              case 'equipamiento_medico':
                const medicalEquipmentResponse = 'Para ofrecer o solicitar un equipamiento médico, debe dirigirse a la sección "Equipamiento Médico". Allí podrá visualizar un listado de solicitudes y ofrecimientos de equipamiento médico. Haga clic en el botón "Agregar equipamiento" para cargarlo.';
                setMessages([...messages, { text: medicalEquipmentResponse, sender: 'bot' }]);
                break;
  
              case 'eventos':
                const eventResponse = 'Para visualizar los eventos del corriente mes, visite la sección "Eventos". Allí podrá encontrar un calendario de eventos del mes y sus detalles.';
                setMessages([...messages, { text: eventResponse, sender: 'bot' }]);
                break;

              case 'gracias':
                const thanksResponse = '¡Gracias a usted por comunicarse! Ante cualquier otra consulta quedo a las órdenes.';
                setMessages([...messages, { text: thanksResponse, sender: 'bot' }]);
                break;

              case 'noticias':
                const noticiaResponse = 'Para visualizar las noticias, debe dirigirse a la sección "Noticias y destacados". Allí podrá visualizar las noticias destacadas y un listado de noticias generales. Haga clic en el botón "Leer más" para ver el contenido completo.';
                setMessages([...messages, { text: noticiaResponse, sender: 'bot' }]);
                break;

              case 'ofrecimientos':
                const ofrecimientosResponse = 'Para visualizar sus ofrecimientos, debe dirigirse al botón de perfil, y luego "Mis ofrecimientos". Allí podrá visualizar el listado de los mismos por modulo.';
                setMessages([...messages, { text: ofrecimientosResponse, sender: 'bot' }]);
                break;
      
              case 'padrinos':
                const sponsorResponse = 'Para postularse como padrino de una causa o solicitar uno, debe dirigirse la sección "Voluntarios y Padrinos" y presionar el botón "Padrinos". Allí podrá visualizar un listado de solicitudes y ogrecimientos. Haga clic en el botón "Agregar padrino" para poder cargarlo.';
                setMessages([...messages, { text: sponsorResponse, sender: 'bot' }]);
                break;
              
              // case 'saludo':
              //   const saludoResponse = '¡Gracias por comunicarse! Ante cualquier otra consulta quedo a las órdenes.';
              //   setMessages([...messages, { text: saludoResponse, sender: 'bot' }]);
              //   break;  
    
              case 'solicitudes':
                const solicitudesResponse = 'Para visualizar sus solicitudes, debe dirigirse al botón de perfil, y luego "Mis solicitudes". Allí podrá visualizar el listado de los mismos por modulo.';
                setMessages([...messages, { text: solicitudesResponse, sender: 'bot' }]);
                break; 

              case 'terminos':
                const terminosResponse = 'Para visualizar y poder leer los términos y condiciones de la platadorma DonacionesUy, debe seleccionar al botón correspondiente al final de la página.';
                setMessages([...messages, { text: terminosResponse, sender: 'bot' }]);
                break;

              case 'usuario':
                const usuarioResponse = 'Para realizar modificaciones en su perfil, debe dirigirse al botón de perfil, y luego "Mi cuenta". Alli podrá modificar su contraseña.';
                setMessages([...messages, { text: usuarioResponse, sender: 'bot' }]);
                break;

              case 'voluntario':
                const volunteerResponse = 'Para postularse como voluntario o solicitar uno, dirigirse a la sección "Voluntarios y Padrinos". Allí podrá visualizar un listado de solicitudes y ofrecimientos. Haga clic en el botón "Agregar voluntariado" para cargarlo.';
                setMessages([...messages, { text: volunteerResponse, sender: 'bot' }]);
                break;
              
              
              default:
                console.log('No se detectó una intención específica.');      
                break;
            }
          } else {
            const defaultResponse = 'Disculpe, no logro comprender lo que consulta. ¿Puede brindarme más detalles?';
            const newBotMessage = { text: defaultResponse, sender: 'bot' };
            setMessages([...newMessages, newBotMessage]);
        }
        }
    
        setInputText('');
        lastInteractionTimeRef.current = new Date(); 
      }
    };
  

  const analyzeIntent = async (message) => {
    const witAiToken = 'ASTAXACYVJTNS3VWHGPVPWZWRSRQU5C6'; 
    const response = await fetch(`https://api.wit.ai/message?v=20231119&q=${encodeURIComponent(message)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${witAiToken}`,
      },
    });
  
    return await response.json();
  };
  

  const handleToggleChatbot = () => {
    if (!isOpen) {
      if (messageContainerRef.current) {
        bottomRef.current = messageContainerRef.current.scrollHeight;
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      
      {isOpen && (
        <div className="chat-window">
          <div className="message-container" ref={messageContainerRef}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}  
              placeholder="Escribe tu mensaje..."
            />
            <button onClick={handleSendMessage} variant="primary" className="button-enviar">
              Enviar
            </button>
          </div>
        </div>
      )}
      <div className="logo-container" onClick={handleToggleChatbot}>
        <img src={chatbotLogo} alt="Chatbot Logo" />
      </div>
    </div>
  );
};


export default Chatbot;
