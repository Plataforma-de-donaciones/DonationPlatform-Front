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
        // Llamada a Wit.ai para analizar la intención del mensaje
        const witAiResponse = await analyzeIntent(inputText);
  
        // Verificar si Wit.ai detectó la intención "Donación"
        if (witAiResponse && witAiResponse.intents && witAiResponse.intents.length > 0) {
            // Respuestas según la intención detectada
            const intent = witAiResponse.intents[0].name;
    
            switch (intent) {
              case 'donacion':
                // Respuesta para la intención "Donación"
                const donationResponse = 'Para realizar una donación, debe dirigirse a la pestaña "Donaciones". Allí podrá visualizar un listado de solicitudes y ofrecimientos. Haga clic en el botón "Agregar donación" para cargarla.';
                setMessages([...messages, { text: donationResponse, sender: 'bot' }]);
                break;
    
              case 'equipamiento_medico':
                // Respuesta para la intención "Equipamiento_Medico"
                const medicalEquipmentResponse = 'Para donar equipamiento médico, visite la sección "Equipamiento Médico". Allí podrá encontrar un listado de solicitudes y ofrecimientos de equipamiento médico. Haga clic en el botón "Agregar equipamiento" para cargarlo.';
                setMessages([...messages, { text: medicalEquipmentResponse, sender: 'bot' }]);
                break;
    
              case 'voluntario':
                // Respuesta para la intención "Voluntario"
                const volunteerResponse = 'Si desea ser voluntario, comuníquese con nuestro equipo de voluntariado. Puede encontrar información de contacto en la sección "Voluntariado" de la plataforma.';
                setMessages([...messages, { text: volunteerResponse, sender: 'bot' }]);
                break;
    
              case 'padrinos':
                // Respuesta para la intención "Padrino"
                const sponsorResponse = 'Para convertirse en padrino, explore la sección "Padrinos" en la plataforma. Allí encontrará información sobre cómo apadrinar y hacer una diferencia.';
                setMessages([...messages, { text: sponsorResponse, sender: 'bot' }]);
                break;
    
              case 'eventos':
                // Respuesta para la intención "Evento"
                const eventResponse = 'Si está interesado en eventos, visite la sección "Eventos" de la plataforma. Allí podrá encontrar detalles sobre los eventos próximos y cómo participar.';
                setMessages([...messages, { text: eventResponse, sender: 'bot' }]);
                break;
    
              default:
                console.log('No se detectó una intención específica.');      
                break;
            }
          } else {
            // Lógica de respuesta por defecto si no se detecta ninguna intención
            const defaultResponse = 'No entendí tu solicitud. ¿Puedes reformularla o proporcionar más detalles?';
            const newBotMessage = { text: defaultResponse, sender: 'bot' };
            setMessages([...newMessages, newBotMessage]);
        }
        }
    
        setInputText('');
      }
    };
  
  // Función para llamar a Wit.ai y analizar la intención del mensaje
  const analyzeIntent = async (message) => {
    const witAiToken = 'ASTAXACYVJTNS3VWHGPVPWZWRSRQU5C6'; // Reemplaza con tu token de Wit.ai
    const response = await fetch(`https://api.wit.ai/message?v=20231119&q=${encodeURIComponent(message)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${witAiToken}`,
      },
    });
  
    return await response.json();
  };
  
  // ... (otro código del componente)
  

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
