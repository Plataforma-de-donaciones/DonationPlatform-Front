import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import ComponenteTabla from "../../../../generales/helpers/ComponenteTabla";
import CardComponente from "./../../../../generales/card/CardComponente";
import { Button } from "react-bootstrap";

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

const ListadoVoluntarios = ({ voluntarioId }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [zones, setZones] = useState([]);
  const [conversationIds, setConversationIds] = useState({});
  const token = cookies.get("token");
  const userDataCookie = cookies.get("user_data");
  const user_id = userDataCookie.user_id;
  const history = useHistory();

  const openOrCreateConversation = async (user_1, user_2, solicitudId) => {
    try {
      const solicitud = solicitudes.find(
        (solicitud) => solicitud.id === solicitudId
      );

      if (solicitud && solicitud.conv) {
        // Si ya existe una conversación, redirige a esa conversación
        history.push(`/conversaciones/${solicitud.conv}`);
      } else {
        const existingConvId = conversationIds[solicitudId];
        console.log(existingConvId);

        if (existingConvId) {
          history.push(`/conversaciones/${existingConvId}`);
        } else {
          const response = await instance.post(
            "/conversations/",
            {
              user_1,
              user_2,
            },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

          if (response.data.conv_id) {
            const convIdKey = solicitudId;
            await instance.patch(
              `/requests/${solicitudId}/`,
              {
                conv: response.data.conv_id,
              },
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );
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
      const response = await instance.post(
        "/requests/searchbyvol/",
        {
          search: voluntarioId,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      console.log(voluntarioId);
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
  }, [voluntarioId]);

  const handleConfirmationChange = (solicitudId) => {
    setSolicitudes((prevSolicitudes) =>
      prevSolicitudes.map((solicitud) =>
        solicitud.id === solicitudId
          ? {
              ...solicitud,
              isConfirmationChecked: !solicitud.isConfirmationChecked,
            }
          : solicitud
      )
    );
  };

  const handleUpdateRequest = async (solicitudId) => {
    const confirmation = await Swal.fire({
      title: "¿Está seguro que desea confirmar la solicitud?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });
    if (confirmation.isConfirmed) {
      try {
        const response = await instance.patch(
          `/requests/${solicitudId}/`,
          {
            has_confirmation: true,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setSolicitudes((prevSolicitudes) =>
          prevSolicitudes.map((solicitud) =>
            solicitud.id === solicitudId
              ? {
                  ...solicitud,
                  confirmationAlert: "Confirmación enviada con éxito",
                }
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
        Swal.fire({
          title: "¡Confirmación realizada correctamente!",
          text: "Ha confirmado una solicitud",
          icon: "success",
        });
      } catch (error) {
        console.error("Error al actualizar la solicitud:", error);
      }
    }
  };

  const getZoneName = (zoneValue) => {
    const zone = zones.find((zone) => zone.value === zoneValue);
    return zone ? zone.zone_name : zoneValue;
  };

  return (
    <div>
      <CardComponente
        titulo={"Solicitudes a mis ofrecimientos"}
        isTable={true}
        body={
          <>
            <ComponenteTabla
              headers={[
                "Nombre",
                "Descripción",
                "Zona",
                "Fecha de Envío",
                "Confirmada",
                "Fecha de Confirmación",
                "Confirmar",
                "Comunicarse",
              ]}
              children={
                <>
                  {solicitudes.map((solicitud) => (
                    <tr key={solicitud.id}>
                      <TableCell>{solicitud.req_name}</TableCell>
                      <TableCell>{solicitud.req_description}</TableCell>
                      <TableCell>{getZoneName(solicitud.zone)}</TableCell>
                      <TableCell>{solicitud.req_sent_date}</TableCell>
                      <TableCell>
                        {solicitud.has_confirmation ? "Sí" : "No"}
                      </TableCell>
                      <TableCell>{solicitud.confirmed_at}</TableCell>
                      <TableCell>
                        <Checkbox
                          type="checkbox"
                          checked={solicitud.isConfirmationChecked}
                          onChange={() =>
                            handleConfirmationChange(solicitud.id)
                          }
                        />
                        <Button
                          onClick={() => handleUpdateRequest(solicitud.id)}
                        >
                          Confirmar
                        </Button>
                      </TableCell>

                      <TableCell>
                        <Button
                          onClick={() =>
                            openOrCreateConversation(
                              user_id,
                              solicitud.user,
                              solicitud.id
                            )
                          }
                        >
                          {solicitud.conv
                            ? "Abrir Conversación"
                            : "Iniciar Conversación"}
                        </Button>
                      </TableCell>
                    </tr>
                  ))}
                </>
              }
            />
          </>
        }
      />
    </div>
  );
};

export default ListadoVoluntarios;
