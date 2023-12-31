import { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Card, Table, Button } from "react-bootstrap";
import { useAuth } from "../../../../../AuthContext";


const cookies = new Cookies();


const ListadoPaginadoOcultosAdm = ({ }) => {

  const { setItemId } = useAuth();
  const [datos, setDatos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const history = useHistory();
  const [tipo, setTipo] = useState("donations");
  const [titulo, setTitulo] = useState(["Donaciones"]);
  const token = cookies.get("token");
  const userDataCookie = cookies.get("user_data");
  const user_email = userDataCookie.user_email;
  const [idEnEdicion, setIdEnEdicion] = useState(null);

  useEffect(() => {
    obtenerDatos(tipo);
  }, [paginaActual, tipo]);

  const obtenerDatos = async (tipo) => {
    let endpoint = "";
  
    switch (tipo) {
      case "medicalequipments":
        endpoint = "/medicalequipmentsocult/";
        break;
  
      case "donations":
        endpoint = "/donationocult/";
        break;
      
      case "volunteers":
        endpoint = "/volunteersocult/";
        break;
      
      case "sponsors":
        endpoint = "/sponsorsocult/";
        break;

      case "events":
        endpoint = "/eventocult/";
        break;
  
  
      default:
        console.error("Tipo no válido");
        return;
    }
  
    try {
      const response = await instance.get(endpoint, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
  
      console.log("Respuesta:", response.data);
  
      const itemsPorPagina = 10;
      const inicio = (paginaActual - 1) * itemsPorPagina;
      const fin = inicio + itemsPorPagina;
      const datosPaginados = response.data.slice(inicio, fin);

      setDatos(datosPaginados);
      setTotalPaginas(Math.ceil(response.data.length / itemsPorPagina));
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  const handleActivateEq = async (itemId) => {
    try {
      const formData = new FormData();
      formData.append("has_requests", false);
      formData.append("eq_confirmation_date", "");
  
      const response = await instance.patch(`/medicalequipments/${itemId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
  
      console.log("Respuesta del servidor:", response.data);
      obtenerDatos(tipo);
  
      
    } catch (error) {
      console.error(`Error al destacar el elemento eq`, error);
    }
  };
  const handleActivateDon = async (itemId) => {
    try {
      const formData = new FormData();
      formData.append("has_requests", false);
      formData.append("eq_confirmation_date", "");
  
      const response = await instance.patch(`/donations/${itemId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
  
      console.log("Respuesta del servidor:", response.data);
      obtenerDatos(tipo);
  
      
    } catch (error) {
      console.error(`Error al destacar el elemento eq`, error);
    }
  };
  const handleActivateVol = async (itemId) => {
    try {
      const formData = new FormData();
      formData.append("has_requests", false);
      formData.append("end_date", "");
  
      const response = await instance.patch(`/volunteers/${itemId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
  
      console.log("Respuesta del servidor:", response.data);
      obtenerDatos(tipo);
  
      
    } catch (error) {
      console.error(`Error al destacar el elemento eq`, error);
    }
  };
  const handleActivateSp = async (itemId) => {
    try {
      const formData = new FormData();
      formData.append("has_requests", false);
      formData.append("end_date", "");
  
      const response = await instance.patch(`/sponsors/${itemId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
  
      console.log("Respuesta del servidor:", response.data);
      obtenerDatos(tipo);
  
      
    } catch (error) {
      console.error(`Error al destacar el elemento eq`, error);
    }
  };
  const handleActivateEve = async (itemId) => {
    try {
      const formData = new FormData();
      formData.append("geom_point", "");
      formData.append("end_date", "");
  
      const response = await instance.patch(`/events/${itemId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
  
      console.log("Respuesta del servidor:", response.data);
      obtenerDatos(tipo);
  
      
    } catch (error) {
      console.error(`Error al destacar el elemento eq`, error);
    }
  };
  const eliminarItem = async (id) => {
    console.log("id a eliminar", id);

    const confirmation = await Swal.fire({
      title: "¿Está seguro que desea eliminar?",
      text: "¡No podrá recuperar el dato!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmation.isConfirmed) {
      try {
        await instance.delete(`/${tipo}/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        obtenerDatos();

        Swal.fire({
          title: "¡Eliminado correctamente!",
          text: "Su ofrecimiento ha sido eliminado",
          icon: "success",
        });
      } catch (error) {
        console.error(`Error al eliminar ${tipo}:`, error);
      }
    }
  };

 
  


  useEffect(() => {
    obtenerDatos();
  }, [paginaActual, tipo]);

  return (
    <>
      <Card className="mt-5">
        <Card.Header className="text-center h5">
          Contenido Oculto - {titulo}
        </Card.Header>

        <Card.Body>
          <div className="text-center">
            <Button
              className={"me-3 mb-3"}
              onClick={() => {
                setTipo("donations", setTitulo("Donaciones"));
              }}
            >
              Donaciones
            </Button>
            <Button
              className={"me-3 mb-3"}
              onClick={() =>
                setTipo("medicalequipments", setTitulo("Equipamiento médico"))
              }
            >
              Equipamiento Médico
            </Button>
            <Button
              className={"me-3 mb-3"}
              onClick={() => setTipo("volunteers", setTitulo("Voluntarios"))}
            >
              Voluntarios
            </Button>
            <Button
              className={"me-3 mb-3"}
              onClick={() => setTipo("sponsors", setTitulo("Padrinos"))}
            >
              Padrinos
            </Button>
            <Button
              className={"me-3 mb-3"}
              onClick={() => setTipo("events", setTitulo("Eventos"))}
            >
              Eventos
            </Button>
          </div>

          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha creado</th>
                <th>Solicitudes</th>
                <th>Fecha confirmación</th>
                <th>Oculto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((item) => (
                <tr key={item.id}>
                  {tipo === "donations" && (
                    <>
                      <td>{item.don_name}</td>
                      <td>{item.don_description}</td>
                      <td>{item.don_created_at}</td>
                      <td>{item.request_count}</td>
                      <td>{item.don_confirmation_date}</td>
                      <td>{item.has_requests ? "Si" : "No"}</td>
                      <td className="text-center">
                      <Button
                          variant="primary"
                          onClick={() => handleActivateDon(item.don_id || item.id)}
                        >
                          Activar
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => eliminarItem(item.don_id || item.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </>
                  )}
                  {tipo === "medicalequipments" && (
                    <>
                      <td>{item.eq_name}</td>
                      <td>{item.eq_description}</td>
                      <td>{item.eq_created_at}</td>
                      <td>{item.request_count}</td>

                      <td>{item.eq_confirmation_date}</td>
                      <td>{item.has_requests ? "Si" : "No"}</td>

                      <td className="text-center">
                      <Button
                          variant="primary"
                          onClick={() => handleActivateEq(item.eq_id || item.id)}
                        >
                          Activar
                        </Button>
                        <Button
                          variant="danger"
                          size="md"
                          onClick={() => eliminarItem(item.eq_id || item.id)}
                          style={{ fontWeight: 'bold' }}
                        >
                          Eliminar
                        </Button>

                      </td>
                    </>
                  )}
                  {tipo === "volunteers" && (
                    <>
                      <td>{item.vol_name}</td>
                      <td>{item.vol_description}</td>
                      <td>{item.vol_created_at}</td>
                      <td>{item.request_count}</td>

                      <td>{item.end_date}</td>
                      <td>{item.has_requests ? "Si" : "No"}</td>

                      <td className="text-center">
                      <Button
                          variant="primary"
                          onClick={() => handleActivateVol(item.vol_id || item.id)}
                        >
                          Activar
                        </Button>
                        
                        <Button
                          variant="danger"
                          onClick={() => eliminarItem(item.vol_id || item.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </>
                  )}
                  {tipo === "sponsors" && (
                    <>
                      <td>{item.sponsor_name}</td>
                      <td>{item.sponsor_description}</td>
                      <td>{item.sponsor_created_at}</td>
                      <td>{item.request_count}</td>

                      <td>{item.end_date}</td>
                      <td>{item.has_requests ? "Si" : "No"}</td>

                      <td className="text-center">
                      <Button
                          variant="primary"
                          onClick={() => handleActivateSp(item.sponsor_id || item.id)}
                        >
                          Activar
                        </Button>
                        
                        <Button
                          variant="danger"
                          onClick={() =>
                            eliminarItem(item.sponsor_id || item.id)
                          }
                        >
                          Eliminar
                        </Button>
                      </td>
                    </>
                  )}
                  {tipo === "events" && (
                    <>
                      <td>{item.event_name}</td>
                      <td>{item.event_description}</td>
                      <td>{item.start_date}</td>
                      <td>{item.request_count}</td>
                      <td>{item.eve_confirmation_date}</td>
                      <td>{item.has_requests ? "Si" : "No"}</td>

                      <td className="text-center">
                      <Button
                          variant="primary"
                          onClick={() => handleActivateEve(item.event_id || item.id)}
                        >
                          Activar
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() =>
                            eliminarItem(item.event_id || item.id)
                          }
                        >
                          Eliminar
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>

        <Card.Footer>
          <div className="text-center">
            {Array.from({ length: totalPaginas }).map((_, index) => (
              <Button key={index} onClick={() => cambiarPagina(index + 1)}>
                {index + 1}
              </Button>
            ))}
          </div>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ListadoPaginadoOcultosAdm;
