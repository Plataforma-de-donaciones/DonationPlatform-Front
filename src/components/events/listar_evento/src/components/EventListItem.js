import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaUser, FaExclamationTriangle, FaShareSquare, FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../../../../AuthContext";
import Swal from 'sweetalert2';
import CardItem from '../../../../generales/src/components/CardItem';
import { Button, Card, Col, Row, Container } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import { Modal } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import instance from '../../../../../axios_instance';

const EventCardContainer = styled.div`
  display: flex;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Description = styled.p`
  display: block;
`;

const ExpandButton = styled.button`
  margin-top: 8px;
  align-self: flex-end;
`;

const ImageContainer = styled.div`
flex: 1;
padding-right: 16px;
`;

const Image = styled.img`
  max-width: 200px;
  margin-bottom: 10px;
`;

const TextContainer = styled.div`
flex: 1;
display: flex;
flex-direction: column;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: ${(props) => (props.secondary ? '#ccc' : 'rgba(79,181,139, 1)')};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.secondary ? '#ff0000' : 'rgba(141, 202, 170, 1)')};
  }
`;

const IconContainer = styled.span`
  display: flex;
  align-items: center;
`;

const stateMap = {
  1: "Publicado",
  2: "Solicitado",
  3: "Finalizado",
};

const RedesSociales = {
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  WHATSAPP: 'whatsapp',

};

const EventListItem = ({ evento }) => {
  const [expanded, setExpanded] = useState(true);
  const history = useHistory();
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarCompartir, setMostrarCompartir] = useState(false);
  const [redSocialSeleccionada, setRedSocialSeleccionada] = useState('twitter');

  console.log(mostrarCompartir);
  const handleExpand = () => {
    setExpanded(!expanded);
  };
  const handleRedSocialClick = (nuevaRedSocial) => {
    setRedSocialSeleccionada(nuevaRedSocial);
    setMostrarModal(false);
    const urlCompartir = construirURLCompartir(evento, nuevaRedSocial);
    window.open(urlCompartir, '_blank');
  };  

  const handleUbicacion = () => {
    let coordinates = null;

    if (evento.zone === 1) {
      coordinates = { lat: -30.4076196, lng: -56.46667 };
    } else if (evento.zone === 2) {
      coordinates = { lat: -34.52278, lng: -56.27778 };
    } else if (evento.zone === 3) {
      coordinates = { lat: -32.368055555556, lng: -54.167777777778 };
    } else if (evento.zone === 4) {
      coordinates = { lat: -34.46262, lng: -57.83976 };
    } else if (evento.zone === 5) {
      coordinates = { lat: -33.38056, lng: -56.52361 };
    }else if (evento.zone === 6) {
      coordinates = { lat: -33.6, lng: -56.833333333333 };
    }else if (evento.zone === 7) {
      coordinates = { lat: -32.3171, lng: -58.08072 };
    }else if (evento.zone === 11) {
      coordinates = { lat: -34.37589, lng: -55.23771 };
    }else if (evento.zone === 12) {
      coordinates = { lat:  -34.9, lng: -54.95 };
    }else if (evento.zone === 13) {
      coordinates = { lat: -34.90328, lng: -56.18816 };
    }else if (evento.zone === 14) {
      coordinates = { lat: -34.48333, lng: -54.33333 };
    }else if (evento.zone === 15) {
      coordinates = { lat: -57.9666700, lng: -31.3833300 };
    }else if (evento.zone === 16) {
      coordinates = { lat: -34.3375, lng: -56.71361 };
    }else if (evento.zone === 17) {
      coordinates = { lat: -33.2524, lng: -58.03047 };
    }else if (evento.zone === 18) {
      coordinates = { lat: -31.71694, lng: -55.98111 };
    }else if (evento.zone === 19) {
      coordinates = { lat: -33.23333, lng: -54.38333 };
    }else if (evento.zone === 20) {
      coordinates = { lat: -31.348430555556, lng: -53.811069444444 };
    }else if (evento.zone === 21) {
      coordinates = { lat: -30.90534, lng: -55.55076 };
    }else if (evento.zone === 22) {
      coordinates = { lat: -34.0955600, lng: -56.2141700 };
    }

    setMapCoordinates(coordinates);
    console.log(coordinates.lat, coordinates.lng);
    setShowMap(true);
  };
  const handleCloseMap = () => {
    setShowMap(false);
  };

  const handleCloseCompartir = () => {
    setMostrarCompartir(false);
  };

  const construirURLCompartir = (evento, redSocial) => {
    const textoEvento = encodeURIComponent(`Mira el evento: ${evento.event_name}, publicado en DonacionesUy. Haz clic sobre el link para visualizarlo. ¡Se parte de DonacionesUy, transformamos intenciones en impacto social!`);
    const urlEvento = encodeURIComponent(`https://donacionesuy.azurewebsites.net/listadoeventos`);

    switch (redSocial) {
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${textoEvento}&url=${urlEvento}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${urlEvento}&quote=${textoEvento}`;
      case 'instagram':
        return `https://www.instagram.com/?url=${urlEvento}&title=${textoEvento}`;
      case 'whatsapp':
        return `https://api.whatsapp.com/send?text=${encodeURIComponent(textoEvento + '\n' + urlEvento)}`;
      default:
        return '';
    }
  };

  const handleCompartirClick = () => {
    const urlCompartir = construirURLCompartir(evento, redSocialSeleccionada);
    window.open(urlCompartir, '_blank');
  };
  const IconoRedSocial = ({ icono: Icono, redSocial, onClick }) => {
    return (
      <div style={{ cursor: 'pointer' }} onClick={() => onClick(redSocial)}>
        <Icono size={40} />
        <p style={{ textAlign: 'center', margin: 0 }}>{redSocial.charAt(0).toUpperCase() + redSocial.slice(1)}</p>
      </div>
    );
  };
  return (
    <>
      <Card className='mb-3'>

        <Card.Title className='text-center mt-3 card-titulo'>{evento.event_name}</Card.Title>
        <span className='text-center'>{evento.event_description}</span>
        <Card.Body>

          <Row className='text-center'>
            <Col>
              {evento.attachments && <Image src={evento.attachments} alt="Evento" />}
            </Col>
          </Row>

          <Row className='text-center'>
            <Col>
              <div>
                <label className="font-weight-bold">Fecha de Inicio:</label>
                <span style={{ textAlign: "left" }}> {evento.formattedDateTime.formattedDate}</span>
              </div>
              <div>
                <label style={{ textAlign: "left" }}>Hora de Inicio:</label>
                <span style={{ textAlign: "left" }}> {evento.formattedDateTime.formattedTime}</span>
              </div>
            </Col>

            <Col className='align-middle'>
              <div>
                <label className="align-middle">Fecha de Finalización:</label>
                <span className='align-middle'> {evento.formattedEndDate.formattedDate}</span>
              </div>
              <div>
                <label style={{ textAlign: "left" }}>Hora de Finalización:</label>
                <span style={{ textAlign: "left" }}> {evento.formattedEndDate.formattedTime}</span>
              </div>
            </Col>
          </Row>

        </Card.Body>
        <Card.Footer>
          <div className='text-center mb-3'>
            <label style={{ textAlign: "left" }}>Estado:  </label>
            <span style={{ textAlign: "left" }}>{stateMap[evento.state]}</span>
          </div>
          <ActionButtons className='text-center mx-auto mb-2'>
            <ActionButton onClick={handleUbicacion}>
              <IconContainer>
                <FaMapMarkerAlt />
              </IconContainer>
              Ubicación
            </ActionButton>
            <ActionButton onClick={() => setMostrarCompartir(true)} style={{ position: 'absolute', top: '0', left: '0', margin: '8px' }} third>
                <IconContainer>
                  <FaShareSquare />
                </IconContainer>
              </ActionButton>
          </ActionButtons>
         
        </Card.Footer>
      </Card >
      <Modal show={showMap} onHide={handleCloseMap} centered>
              <Modal.Header closeButton>
                <Modal.Title>Ubicación</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {mapCoordinates && (
                  <MapContainer
                    center={mapCoordinates}
                    zoom={13}
                    style={{ height: '300px', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={mapCoordinates}>
                      <Popup>Ubicación</Popup>
                    </Marker>
                  </MapContainer>
                )}
              </Modal.Body>
            </Modal>
            <Modal show={mostrarCompartir} onHide={handleCloseCompartir} centered>
              <Modal.Header closeButton>
                <Modal.Title>Selecciona una red social</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <IconoRedSocial icono={FaTwitter} redSocial={RedesSociales.TWITTER} onClick={handleRedSocialClick} />
                  <IconoRedSocial icono={FaFacebook} redSocial={RedesSociales.FACEBOOK} onClick={handleRedSocialClick} />
                  <IconoRedSocial icono={FaInstagram} redSocial={RedesSociales.INSTAGRAM} onClick={handleRedSocialClick} />
                  <IconoRedSocial icono={FaWhatsapp} redSocial={RedesSociales.WHATSAPP} onClick={handleRedSocialClick} />
                </div>
              </Modal.Body>
            </Modal>
    
    </>
  );
};

export default EventListItem;
