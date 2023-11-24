import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../../../../AuthContext";
import Swal from 'sweetalert2';
import { Container, Row, Col } from 'react-bootstrap';
import CardItem from '../../../../generales/src/components/CardItem';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import { Modal } from 'react-bootstrap';

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

const VoluntarioListItem = ({ volunteer }) => {
  const history = useHistory();
  const { isAuthenticated } = useAuth();
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const handleAction = () => {
    if (isAuthenticated) {
      if (volunteer.type === 1) {
        history.push(`/donarvoluntariado/${volunteer.vol_id}`);
      } else {
        console.log('Solicitar:', volunteer.vol_name);
        console.log('id', volunteer.vol_id);
        history.push(`/solicitarvoluntariado/${volunteer.vol_id}`);
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

    if (volunteer.zone === 1) {
      coordinates = { lat: -30.4076196, lng: -56.46667 };
    } else if (volunteer.zone === 2) {
      coordinates = { lat: -34.52278, lng: -56.27778 };
    } else if (volunteer.zone === 3) {
      coordinates = { lat: -32.368055555556, lng: -54.167777777778 };
    } else if (volunteer.zone === 4) {
      coordinates = { lat: -34.46262, lng: -57.83976 };
    } else if (volunteer.zone === 5) {
      coordinates = { lat: -33.38056, lng: -56.52361 };
    } else if (volunteer.zone === 6) {
      coordinates = { lat: -33.6, lng: -56.833333333333 };
    } else if (volunteer.zone === 7) {
      coordinates = { lat: -32.3171, lng: -58.08072 };
    } else if (volunteer.zone === 11) {
      coordinates = { lat: -34.37589, lng: -55.23771 };
    } else if (volunteer.zone === 12) {
      coordinates = { lat: -34.9, lng: -54.95 };
    } else if (volunteer.zone === 13) {
      coordinates = { lat: -34.90328, lng: -56.18816 };
    } else if (volunteer.zone === 14) {
      coordinates = { lat: -34.48333, lng: -54.33333 };
    } else if (volunteer.zone === 15) {
      coordinates = { lat: -57.9666700, lng: -31.3833300 };
    } else if (volunteer.zone === 16) {
      coordinates = { lat: -34.3375, lng: -56.71361 };
    } else if (volunteer.zone === 17) {
      coordinates = { lat: -33.2524, lng: -58.03047 };
    } else if (volunteer.zone === 18) {
      coordinates = { lat: -31.71694, lng: -55.98111 };
    } else if (volunteer.zone === 19) {
      coordinates = { lat: -33.23333, lng: -54.38333 };
    } else if (volunteer.zone === 20) {
      coordinates = { lat: -31.348430555556, lng: -53.811069444444 };
    } else if (volunteer.zone === 21) {
      coordinates = { lat: -30.90534, lng: -55.55076 };
    } else if (volunteer.zone === 22) {
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
        name={volunteer.vol_name}
        state={stateMap[volunteer.state]}
        descriptions={volunteer.vol_description}
        childrens={
          <>
            <ActionButtons className='mb-3'>
              <ActionButton onClick={handleAction}>
                <IconContainer>
                  <FaUser />
                </IconContainer>
                {volunteer.type === 1 ? "Donar" : "Solicitar"}
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

export default VoluntarioListItem;
