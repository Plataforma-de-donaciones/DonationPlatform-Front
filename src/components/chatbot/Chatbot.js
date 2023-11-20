import React, { useState } from 'react';
import './Chatbot.css';
import chatbotLogo from './chatbot.png';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() !== '') {
      const newUserMessage = { text: inputText, sender: 'user' };
      const newMessages = [...messages, newUserMessage];
      setMessages(newMessages);
  
      if (messages.length === 0) {
        setMessages([
          { text: 'Hola, bienvenido/a a la plataforma de donaciones. ¿En qué puedo ayudarte?', sender: 'bot' },
        ]);
      } else {
        // llama a wit.ai para encontrar la intencion del mensaje
        const witAiResponse = await analyzeIntent(inputText);
  
        // si detecta la intencion
        if (witAiResponse && witAiResponse.intents && witAiResponse.intents.length > 0) {
            
            const intent = witAiResponse.intents[0].name;
    
            switch (intent) {
              case 'donacion':
                const donationResponse = 'Para realizar una donación, debe dirigirse a la sección "Donaciones". Allí podrá visualizar un listado de solicitudes y ofrecimientos. Haga clic en el botón "Agregar donación" para cargarla.';
                setMessages([...messages, { text: donationResponse, sender: 'bot' }]);
                break;
    
              case 'equipamiento_medico':
                const medicalEquipmentResponse = 'Para donar equipamiento médico, debe dirigirse a la sección "Equipamiento Médico". Allí podrá visualizar un listado de solicitudes y ofrecimientos de equipamiento médico. Haga clic en el botón "Agregar equipamiento" para cargarlo.';
                setMessages([...messages, { text: medicalEquipmentResponse, sender: 'bot' }]);
                break;
    
              case 'voluntario':
                const volunteerResponse = 'Si desea postularse como voluntario o solicitar voluntarios, dirigirse a la sección "Voluntarios y Padrinos". Allí podrá visualizar un listado de solicitudes y ofrecimientos. Haga clic en el botón "Agregar voluntariado" para cargarlo.';
                setMessages([...messages, { text: volunteerResponse, sender: 'bot' }]);
                break;
    
              case 'padrinos':
                const sponsorResponse = 'Si desea ser padrino de una causa o solicitar apadrinadores, debe dirigirse la sección "Voluntarios y Padrinos" y presionar el botón "Padrinos". Allí podrá visualizar un listado de solicitudes y ogrecimientos. Haga clic en el botón "Agregar padrino" para poder cargarlo.';
                setMessages([...messages, { text: sponsorResponse, sender: 'bot' }]);
                break;
    
              case 'eventos':
                const eventResponse = 'Para visualizar los eventos, visite la sección "Eventos". Allí podrá encontrar un calendario de eventos del mes y sus detalles.';
                setMessages([...messages, { text: eventResponse, sender: 'bot' }]);
                break;

              case 'gracias':
                const thanksResponse = '¡Gracias a usted por comunicarse!. Ante cualquier otra consulta quedo a las órdenes.';
                setMessages([...messages, { text: thanksResponse, sender: 'bot' }]);
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
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      <div className={`logo-container ${isOpen ? 'open' : ''}`} onClick={handleToggleChatbot}>
        <img src={chatbotLogo} alt="Chatbot Logo" />
      </div>
      {isOpen && (
        <div className="chat-window">
          <div className="message-container">
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
              placeholder="Escribe tu mensaje..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
