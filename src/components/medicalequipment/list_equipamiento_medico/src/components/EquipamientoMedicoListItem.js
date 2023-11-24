import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'; // Importa useHistory
import { useAuth } from "../../../../../AuthContext";
import Swal from 'sweetalert2';
import CardItem from './../../../../generales/src/components/CardItem';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import { Modal } from 'react-bootstrap';


const EquipamientoMedicoCardContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Image = styled.img`
  max-width: 200px;
  margin-bottom: 10px;
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
  background-color: rgba(79,181,139, 1);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 8px;
`;

const IconContainer = styled.span`
  margin-right: 8px;
  margin-bottom: 3px;

`;

const stateMap = {
  1: "Publicado",
  2: "Solicitado",
  3: "Finalizado",
};

const EquipamientoMedicoListItem = ({ equipamiento }) => {
  const [expanded, setExpanded] = useState(true);
  const history = useHistory(); 
  const { isAuthenticated } = useAuth();
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [showMap, setShowMap] = useState(false);


  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleAction = () => {
    if (isAuthenticated) {
      if (equipamiento.type === 1) {
        history.push(`/donarequipamiento/${equipamiento.eq_id}`);
      } else {
        console.log('Solicitar:', equipamiento.eq_name);
        console.log('id', equipamiento.eq_id);
        history.push(`/solicitarequipamiento/${equipamiento.eq_id}`);
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

    if (equipamiento.zone === 1) {
      coordinates = { lat: -30.4076196, lng: -56.46667 };
    } else if (equipamiento.zone === 2) {
      coordinates = { lat: -34.52278, lng: -56.27778 };
    } else if (equipamiento.zone === 3) {
      coordinates = { lat: -32.368055555556, lng: -54.167777777778 };
    } else if (equipamiento.zone === 4) {
      coordinates = { lat: -34.46262, lng: -57.83976 };
    } else if (equipamiento.zone === 5) {
      coordinates = { lat: -33.38056, lng: -56.52361 };
    }else if (equipamiento.zone === 6) {
      coordinates = { lat: -33.6, lng: -56.833333333333 };
    }else if (equipamiento.zone === 7) {
      coordinates = { lat: -32.3171, lng: -58.08072 };
    }else if (equipamiento.zone === 11) {
      coordinates = { lat: -34.37589, lng: -55.23771 };
    }else if (equipamiento.zone === 12) {
      coordinates = { lat:  -34.9, lng: -54.95 };
    }else if (equipamiento.zone === 13) {
      coordinates = { lat: -34.90328, lng: -56.18816 };
    }else if (equipamiento.zone === 14) {
      coordinates = { lat: -34.48333, lng: -54.33333 };
    }else if (equipamiento.zone === 15) {
      coordinates = { lat: -57.9666700, lng: -31.3833300 };
    }else if (equipamiento.zone === 16) {
      coordinates = { lat: -34.3375, lng: -56.71361 };
    }else if (equipamiento.zone === 17) {
      coordinates = { lat: -33.2524, lng: -58.03047 };
    }else if (equipamiento.zone === 18) {
      coordinates = { lat: -31.71694, lng: -55.98111 };
    }else if (equipamiento.zone === 19) {
      coordinates = { lat: -33.23333, lng: -54.38333 };
    }else if (equipamiento.zone === 20) {
      coordinates = { lat: -31.348430555556, lng: -53.811069444444 };
    }else if (equipamiento.zone === 21) {
      coordinates = { lat: -30.90534, lng: -55.55076 };
    }else if (equipamiento.zone === 22) {
      coordinates = { lat: -34.0955600, lng: -56.2141700 };
    }

    setMapCoordinates(coordinates);
    console.log(coordinates.lat, coordinates.lng);
    setShowMap(true);
  };
  const handleCloseMap = () => {
    setShowMap(false);
  };

  return (
    <>
      <CardItem
        name={equipamiento.eq_name}
        state={stateMap[equipamiento.state]}
        descriptions={equipamiento.eq_description}
        image={equipamiento.eq_attachment}
        isGrid
        childrens={
          <>
            <ActionButtons className='mb-3'>
              <ActionButton onClick={handleAction}>
                <IconContainer>
                  <FaUser />
                </IconContainer>
                {equipamiento.type === 1 ? "Donar" : "Solicitar"}
              </ActionButton>
              <ActionButton onClick={handleUbicacion}>
                <IconContainer>
                  <FaMapMarkerAlt />
                </IconContainer>
                Ubicación
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
          </>
        }
     />
     
    </>
  );
};

export default EquipamientoMedicoListItem;
