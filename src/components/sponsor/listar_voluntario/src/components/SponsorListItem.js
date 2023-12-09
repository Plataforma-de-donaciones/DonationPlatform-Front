import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaUser, FaExclamationTriangle, FaShareSquare, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../../../../AuthContext";
import Swal from 'sweetalert2';
import CardItem from '../../../../generales/src/components/CardItem';
import { Container, Row, Col } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import { Modal } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import instance from '../../../../../axios_instance';

const cookies = new Cookies();

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
};

const SponsorListItem = ({ sponsor }) => {
  const { setItemId } = useAuth();
  const [expanded, setExpanded] = useState(true);
  const history = useHistory();
  const { isAuthenticated } = useAuth();
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const token = cookies.get("token");
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
    const urlCompartir = construirURLCompartir(sponsor, nuevaRedSocial);
    window.open(urlCompartir, '_blank');
  };

  const handleAction = (id) => {
    if (isAuthenticated) {
      if (sponsor.type === 1) {
        setItemId(id);
        history.push(`/donarpadrino`);
      } else {
        setItemId(id);
        history.push(`/solicitarpadrino`);
      }
    } else {
      Swal.fire({
        title: 'Debes iniciar sesión para completar esta acción',
        text: '¿Desea ir al login en este momento?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/login');
        }
      });
    }
  };

  const handleDenunciar = async (id) => {
    if (isAuthenticated) {
      const confirmation = await Swal.fire({
        title: "¿Está seguro que desea denunciar la publicación?",
        text: "Esta publicación será marcada como contenido inapropiado y se envía a revisión.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, confirmar",
        cancelButtonText: "Cancelar",
      });

      if (confirmation.isConfirmed) {
        try {
          const formData = new FormData();          
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - 1);
          formData.append("end_date", currentDate.toISOString());          
          formData.append("has_requests", true);

          const response = await instance.patch(
            `/sponsors/${id}/`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${token}`,
              },
            }
          );

          Swal.fire({
            title: "¡Publicación denunciada correctamente!",
            text: "La publicación ha sido marcada como contenido inapropiado",
            icon: "success",
          });
          history.push("/listadoapadrinamiento");
          console.log("Respuesta del servidor:", response.data);
        } catch (error) {
          console.error("Error al confirmar la solicitud:", error);
        }
      }
    } else {
      Swal.fire({
        title: 'Debes iniciar sesión para completar esta acción',
        text: '¿Desea ir al login en este momento?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/login');
        }
      });
    }
  };

  const handleUbicacion = () => {
    let coordinates = null;

    if (sponsor.zone === 1) {
      coordinates = { lat: -30.4076196, lng: -56.46667 };
    } else if (sponsor.zone === 2) {
      coordinates = { lat: -34.52278, lng: -56.27778 };
    } else if (sponsor.zone === 3) {
      coordinates = { lat: -32.368055555556, lng: -54.167777777778 };
    } else if (sponsor.zone === 4) {
      coordinates = { lat: -34.46262, lng: -57.83976 };
    } else if (sponsor.zone === 5) {
      coordinates = { lat: -33.38056, lng: -56.52361 };
    } else if (sponsor.zone === 6) {
      coordinates = { lat: -33.6, lng: -56.833333333333 };
    } else if (sponsor.zone === 7) {
      coordinates = { lat: -32.3171, lng: -58.08072 };
    } else if (sponsor.zone === 11) {
      coordinates = { lat: -34.37589, lng: -55.23771 };
    } else if (sponsor.zone === 12) {
      coordinates = { lat: -34.9, lng: -54.95 };
    } else if (sponsor.zone === 13) {
      coordinates = { lat: -34.90328, lng: -56.18816 };
    } else if (sponsor.zone === 14) {
      coordinates = { lat: -34.48333, lng: -54.33333 };
    } else if (sponsor.zone === 15) {
      coordinates = { lat: -57.9666700, lng: -31.3833300 };
    } else if (sponsor.zone === 16) {
      coordinates = { lat: -34.3375, lng: -56.71361 };
    } else if (sponsor.zone === 17) {
      coordinates = { lat: -33.2524, lng: -58.03047 };
    } else if (sponsor.zone === 18) {
      coordinates = { lat: -31.71694, lng: -55.98111 };
    } else if (sponsor.zone === 19) {
      coordinates = { lat: -33.23333, lng: -54.38333 };
    } else if (sponsor.zone === 20) {
      coordinates = { lat: -31.348430555556, lng: -53.811069444444 };
    } else if (sponsor.zone === 21) {
      coordinates = { lat: -30.90534, lng: -55.55076 };
    } else if (sponsor.zone === 22) {
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

  const construirURLCompartir = (sponsor, redSocial) => {
    const textoPadrino = encodeURIComponent(`Padrino: ${sponsor.sponsor_name}`);
    const urlPadrino = encodeURIComponent(`URL de la página de detalles del padrino`);

    switch (redSocial) {
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${textoPadrino}&url=${urlPadrino}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${urlPadrino}&quote=${textoPadrino}`;
      case 'instagram':
        return `https://www.instagram.com/?url=${urlPadrino}&title=${textoPadrino}`;
      default:
        return '';
    }
  };
  const handleCompartirClick = () => {
    const urlCompartir = construirURLCompartir(sponsor, redSocialSeleccionada);
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
      <CardItem
        name={sponsor.sponsor_name}
        state={stateMap[sponsor.state]}
        descriptions={sponsor.sponsor_description}
        childrens={
          <>
            <ActionButtons className='mb-3'>
              <ActionButton onClick={() => handleAction(sponsor.sponsor_id || sponsor.id)}>
                <IconContainer>
                  <FaUser />
                </IconContainer>
                {sponsor.type === 1 ? "Donar" : "Solicitar"}
              </ActionButton>
              <ActionButton onClick={handleUbicacion}>
                <IconContainer>
                  <FaMapMarkerAlt />
                </IconContainer>
                Ubicación
              </ActionButton>
              <ActionButton onClick={() => setMostrarCompartir(true)}>
                <IconContainer>
                  <FaShareSquare />
                </IconContainer>
                Compartir
              </ActionButton>
              <ActionButton onClick={() => handleDenunciar(sponsor.sponsor_id || sponsor.id)} style={{ position: 'absolute', top: '0', right: '0', margin: '8px' }}
              secondary>
                <IconContainer>
                  <FaExclamationTriangle />
                </IconContainer>
              </ActionButton>
            </ActionButtons>
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
                </div>
              </Modal.Body>
            </Modal>
          </>
        }
      />

    </>

  );
};

export default SponsorListItem;
