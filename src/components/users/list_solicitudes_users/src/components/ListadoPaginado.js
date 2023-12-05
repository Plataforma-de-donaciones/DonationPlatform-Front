import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Button, Card, Table } from "react-bootstrap";
import { useAuth } from "../../../../../AuthContext";


const cookies = new Cookies();
const StyledTable = styled.table`
  // border-collapse: collapse;
  // width: 100%;
`;

const th = styled.th`
  // border: 1px solid #ddd;
  // padding: 8px;
  // text-align: left;
`;

const td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;
const ListadoPaginado = ({ }) => {
  const { setItemId } = useAuth();
  const [datos, setDatos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [tipo, setTipo] = useState("donations");
  const [titulo, setTitulo] = useState(["Donaciones"]);
  const history = useHistory();
  const location = useLocation();
  const token = cookies.get("token");
  const userDataCookie = cookies.get("user_data");
  const user_email = userDataCookie.user_email;
  const [idEnEdicion, setIdEnEdicion] = useState(null);

  /*const editarItem = (idField, id) => {
    setIdEnEdicion(id);

    switch (tipo) {
      case "medicalequipments":
        history.push(`/editarequipamiento/${id}`);
        break;
      case "donations":
        history.push(`/editardonacion/${id}`);
        break;
      case "volunteers":
        history.push(`/editarvoluntario/${id}`);
        break;
      case "sponsors":
        history.push(`/editarsponsor/${id}`);
        break;

      default:
        break;
    }
  };*/

  const obtenerDatos = async () => {
    try {
      const response = await instance.post(`/${tipo}/searchbytypeuser/`, {
        search_type: 1,
        search_user: user_email,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const itemsPorPagina = 6;
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
  const editarItemEq = (id) => {
    setItemId(id);
    setTipo(tipo);

    history.push("/editarequipamiento");
  };
  const editarItemDon = (id) => {
    setItemId(id);
    setTipo(tipo);

    history.push("/editardonacion");
  };
  const editarItemVol = (id) => {
    setItemId(id);
    setTipo(tipo);

    history.push("/editarvoluntario");
  };
  const editarItemSponsor = (id) => {
    setItemId(id);
    setTipo(tipo);

    history.push("/editarsponsor");
  };
  const handleSolicitudesClick = (id) => {
    setItemId(id);
    history.push(`/listadorequestdon`);
  };
  const handleSolicitudesClickEq = (id) => {
    setItemId(id);
    history.push(`/listadorequesteq`);
  };
  const handleSolicitudesClickVol = (id) => {
    setItemId(id);
    history.push(`/listadorequestvol`);
  };
  const handleSolicitudesClickSp = (id) => {
    setItemId(id);
    history.push(`/listadorequestsponsor`);
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
      cancelButtonText: "Cancelar"
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
          title: "Eliminado correctamente!",
          text: "Su solicitud ha sido eliminada",
          icon: "success"
        });
      } catch (error) {
        console.error(`Error al eliminar ${tipo}:`, error);
      }
    }
  };
  const finalizarItem = async (id) => {
    const confirmation = await Swal.fire({
      title: "¿Está seguro que finalizar la publicación?",
      text: "¡La publicación ya no será visible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, finalizar!",
      cancelButtonText: "Cancelar",
    });


    if (confirmation.isConfirmed) {
      try {
        const formData = new FormData();
        formData.append("don_confirmation_date", new Date().toISOString());
        formData.append("eq_confirmation_date", new Date().toISOString());

        const response = await instance.patch(
          `/${tipo}/${id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Token ${token}`,
            },
          }
        );

        Swal.fire({
          title: "¡Finalizado correctamente!",
          text: "Su publicacion de ofrecimiento ha sido finalizada",
          icon: "success",
        });
        console.log("Respuesta del servidor:", response.data);
      } catch (error) {
        console.error(`Error al eliminar ${tipo}:`, error);
      }
    }
  };

  const finalizarVolPadItem = async (id) => {
    const confirmation = await Swal.fire({
      title: "¿Está seguro que finalizar la publicación?",
      text: "¡La publicación ya no será visible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, finalizar!",
      cancelButtonText: "Cancelar",
    });


    if (confirmation.isConfirmed) {
      try {
        const formData = new FormData();
        formData.append("end_date", new Date().toISOString());

        const response = await instance.patch(
          `/${tipo}/${id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Token ${token}`,
            },
          }
        );

        Swal.fire({
          title: "¡Finalizado correctamente!",
          text: "Su publicacion de ofrecimiento ha sido finalizada.",
          icon: "success",
        });
        console.log("Respuesta del servidor:", response.data);
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
      <Card className='mt-5'>
        <Card.Header className="text-center h5">
          Mis solicitudes - {titulo}
        </Card.Header>
        <Card.Body>
          <div className="text-center">
            <Button className={"me-3 mb-3"} onClick={() => { setTipo("donations", setTitulo("Donaciones")) }}>Donaciones</Button>
            <Button className={"me-3 mb-3"} onClick={() => setTipo("medicalequipments", setTitulo("Equipamiento médico"))}>Equipamiento Médico</Button>
            <Button className={"me-3 mb-3"} onClick={() => setTipo("volunteers", setTitulo("Voluntarios"))}>Voluntarios</Button>
            <Button className={"me-3 mb-3"} onClick={() => setTipo("sponsors", setTitulo("Padrinos"))}>Padrinos</Button>
          </div>

          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha creado</th>
                <th>Ofrecimientos</th>
                <th>Fecha confirmación</th>
                <th>Tiene ofrecimientos</th>
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
                      <Button variant="link" onClick={() => handleSolicitudesClick(item.don_id)}>
                        {item.request_count}
                      </Button>
                      <td>{item.don_confirmation_date}</td>
                      <td>{item.has_requests ? "Yes" : "No"}</td>

                      <td className="text-center" >

                        <Button
                          variant="primary me-2"
                          onClick={() => editarItemDon(item.don_id || item.id)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="secondary me-2"
                          onClick={() => finalizarItem(item.don_id || item.id)}
                        >
                          Finalizar
                        </Button>
                        <Button variant="danger" onClick={() => eliminarItem(item.don_id || item.id)}>
                          Eliminar
                        </Button>

                      </td>



                    </>
                  )}
                  {tipo === "medicalequipments" && (
                    <>
                      <td>{item.eq_name}</td>
                      <td>{item.eq_description}</td>
                      <td>{item.don_created_at}</td>
                      <Button variant="link" onClick={() => handleSolicitudesClickEq(item.eq_id)}>
                        {item.request_count}
                      </Button>
                      <td>{item.eq_confirmation_date}</td>
                      <td>{item.has_requests ? "Yes" : "No"}</td>

                      <td className="text-center" >

                        <Button
                          variant="primary me-2"
                          onClick={() => editarItemEq(item.eq_id || item.id)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="secondary me-2"
                          onClick={() => finalizarItem(item.eq_id || item.id)}
                        >
                          Finalizar
                        </Button>
                        <Button variant="danger" onClick={() => eliminarItem(item.eq_id || item.id)}>
                          Eliminar
                        </Button>

                      </td>
                    </>
                  )}
                  {tipo === "volunteers" && (
                    <>
                      <td>{item.vol_name}</td>
                      <td>{item.vol_description}</td>
                      <td>{item.end_date}</td>
                      <Button variant="link" onClick={() => handleSolicitudesClickVol(item.vol_id)}>
                        {item.request_count}
                      </Button>
                      <td>{item.vol_confirmation_date}</td>
                      <td>{item.has_requests ? "Yes" : "No"}</td>

                      <td className="text-center" >

                        <Button
                          variant="primary me-2"
                          onClick={() => editarItemVol(item.vol_id || item.id)}
                        >
                          Editar
                        </Button>                        <Button
                          variant="secondary me-2"
                          onClick={() => finalizarVolPadItem(item.vol_id || item.id)}
                        >
                          Finalizar
                        </Button>
                        <Button variant="danger" onClick={() => eliminarItem(item.vol_id || item.id)}>
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
                      <Button variant="link" onClick={() => handleSolicitudesClickSp(item.sponsor_id)}>
                        {item.request_count}
                      </Button>
                      <td>{item.end_date}</td>
                      <td>{item.has_requests ? "Yes" : "No"}</td>

                      <td className="text-center" >

                        <Button
                          variant="primary me-2"
                          onClick={() => editarItemSponsor(item.sponsor_id || item.id)}
                        >
                          Editar
                        </Button>                        <Button
                          variant="secondary me-2"
                          onClick={() => finalizarVolPadItem(item.sponsor_id || item.id)}
                        >
                          Finalizar
                        </Button>
                        <Button variant="danger" onClick={() => eliminarItem(item.sponsor_id || item.id)}>
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

export default ListadoPaginado;
