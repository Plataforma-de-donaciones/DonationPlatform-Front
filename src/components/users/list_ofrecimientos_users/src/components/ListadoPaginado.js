import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Card, Table, Button } from "react-bootstrap";

const cookies = new Cookies();

// Define estilos con styled-components
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

const ListadoPaginado = ({ }) => {
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
    obtenerDatos();
  }, [paginaActual, tipo]);

  const obtenerDatos = async () => {
    try {
      const response = await instance.post(`/${tipo}/searchbytypeuser/`, {
        search_type: 2,
        search_user: user_email,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const itemsPorPagina = 5;
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

  const eliminarItem = async (id) => {
    // Mostrar un cuadro de confirmación
    console.log("id a eliminar", id);

    const confirmation = await Swal.fire({
      title: "¿Está seguro que desea eliminar?",
      text: "¡No podrá recuperar el dato!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
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
          text: "Su ofrecimiento ha sido eliminado",
          icon: "success"
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
      <Card className='mt-5'>
        <Card.Header className="text-center h5">
          Mis ofrecimientos - {titulo}
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
                <th>Solicitudes</th>
                <th>Fecha confirmación</th>
                <th>Tiene solicitudes</th>
                <th>Editar</th>
                <th>Eliminar</th>
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
                      <td><Link to={`/listadorequestdon/${item.don_id}`}>{item.request_count}</Link></td>
                      <td>{item.don_confirmation_date}</td>
                      <td>{item.has_requests ? "Yes" : "No"}</td>
                      <td>
                        <Link to={`/editardonacion/${item.don_id}`}>Editar</Link>
                      </td>
                      <td>
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
                      <td>{<Link to={`/listadorequesteq/${item.eq_id}`}>{item.request_count}</Link>}</td>
                      <td>{item.eq_confirmation_date}</td>
                      <td>{item.has_requests ? "Yes" : "No"}</td>
                      <td>
                        <Link to={`/editarequipamiento/${item.eq_id}`}>Editar</Link>
                      </td>
                      <td>
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
                      <td>{item.vol_created_at}</td>
                      <td><Link to={`/listadorequestvol/${item.vol_id}`}>{item.request_count}</Link></td>
                      <td>{item.vol_confirmation_date}</td>
                      <td>{item.has_requests ? "Yes" : "No"}</td>
                      <td>
                        <Link to={`/editarvoluntario/${item.vol_id}`}>Editar</Link>
                      </td>
                      <td>
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
                      <td>{item.request_count} <Link to={`/listadorequestsponsor/${item.sponsor_id}`}>{item.request_count}</Link> </td>
                      <td>{item.sponsor_confirmation_date}</td>
                      <td>{item.has_requests ? "Yes" : "No"}</td>
                      <td>
                        <Link to={`/editarsponsor/${item.sponsor_id}`}>Editar</Link>
                      </td>
                      <td>
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
