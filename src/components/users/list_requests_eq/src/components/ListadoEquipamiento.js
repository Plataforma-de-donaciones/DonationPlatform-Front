import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHeaderCell = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Checkbox = styled.input`
  margin: 0;
`;

const UpdateButton = styled.button`
  margin: 0;
`;

const cookies = new Cookies();

const ListadoEquipamiento = ({ eqId }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [zones, setZones] = useState([]);
  const [conversationIds, setConversationIds] = useState({});
  const token = cookies.get("token");
  const userDataCookie = cookies.get("user_data");
  const user_id = userDataCookie.user_id;
  const history = useHistory();

  const openOrCreateConversation = async (user_1, user_2, solicitudId) => {
    try {
      const solicitud = solicitudes.find((solicitud) => solicitud.id === solicitudId);

      if (solicitud && solicitud.conv) {
        // Si ya existe una conversación, redirige a esa conversación
        history.push(`/conversaciones/${solicitud.conv}`);
      } else {
        const existingConvId = conversationIds[solicitudId];
        console.log(existingConvId);

        if (existingConvId) {
          history.push(`/conversaciones/${existingConvId}`);
        } else {
          const response = await instance.post("/conversations/", {
            user_1,
            user_2,
          }, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (response.data.conv_id) {
            const convIdKey = solicitudId;
            await instance.patch(`/requests/${solicitudId}/`, {
              conv: response.data.conv_id,
            }, {
              headers: {
                Authorization: `Token ${token}`,
              },
            });
            setConversationIds((prevIds) => ({
              ...prevIds,
              [convIdKey]: response.data.conv_id,
            }));
            history.push(`/conversaciones/${response.data.conv_id}`);
            console.log("Conversation IDs:", conversationIds, solicitudId);
          }
        }
      }
    } catch (error) {
      console.error("Error al obtener o crear una conversación:", error);
    }
  };

  const obtenerSolicitudes = async () => {
    try {
      const response = await instance.post("/requests/searchbyeq/", {
        search: eqId,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSolicitudes(response.data);
    } catch (error) {
      console.error("Error al obtener solicitudes:", error);
    }
  };

  const obtenerZonas = async () => {
    try {
      const response = await instance.get("/articleszones/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setZones(response.data);
    } catch (error) {
      console.error("Error al obtener zonas:", error);
    }
  };

  useEffect(() => {
    obtenerSolicitudes();
    obtenerZonas();
  }, [eqId]);

  const handleConfirmationChange = (solicitudId) => {
    setSolicitudes((prevSolicitudes) =>
      prevSolicitudes.map((solicitud) =>
        solicitud.id === solicitudId
          ? { ...solicitud, isConfirmationChecked: !solicitud.isConfirmationChecked }
          : solicitud
      )
    );
  };

  const handleUpdateRequest = async (solicitudId) => {
    try {
      const response = await instance.patch(`/requests/${solicitudId}/`, {
        has_confirmation: true,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.map((solicitud) =>
          solicitud.id === solicitudId
            ? { ...solicitud, confirmationAlert: "Confirmación enviada con éxito" }
            : solicitud
        )
      );
      setTimeout(() => {
        setSolicitudes((prevSolicitudes) =>
          prevSolicitudes.map((solicitud) =>
            solicitud.id === solicitudId
              ? { ...solicitud, confirmationAlert: "" }
              : solicitud
          )
        );
        obtenerSolicitudes();
      }, 3000);
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
    }
  };

  const getZoneName = (zoneValue) => {
    const zone = zones.find((zone) => zone.value === zoneValue);
    return zone ? zone.zone_name : zoneValue;
  };

  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Descripción</TableHeaderCell>
            <TableHeaderCell>Zona</TableHeaderCell>
            <TableHeaderCell>Fecha de Envío</TableHeaderCell>
            <TableHeaderCell>Confirmada</TableHeaderCell>
            <TableHeaderCell>Fecha de Confirmación</TableHeaderCell>
            <TableHeaderCell>Confirmar</TableHeaderCell>
            <TableHeaderCell>Comunicarse</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud) => (
            <tr key={solicitud.id}>
              <TableCell>{solicitud.req_name}</TableCell>
              <TableCell>{solicitud.req_description}</TableCell>
              <TableCell>{getZoneName(solicitud.zone)}</TableCell>
              <TableCell>{solicitud.req_sent_date}</TableCell>
              <TableCell>{solicitud.has_confirmation ? "Sí" : "No"}</TableCell>
              <TableCell>{solicitud.confirmed_at}</TableCell>
              <TableCell>
                <Checkbox
                  type="checkbox"
                  checked={solicitud.isConfirmationChecked}
                  onChange={() => handleConfirmationChange(solicitud.id)}
                />
                <UpdateButton onClick={() => handleUpdateRequest(solicitud.id)}>
                  Confirmar
                </UpdateButton>
              </TableCell>
              <TableCell>
                <button onClick={() => openOrCreateConversation(user_id, solicitud.user, solicitud.id)}>
                  {solicitud.conv ? "Abrir Conversación" : "Iniciar Conversación"}
                </button>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default ListadoEquipamiento;
