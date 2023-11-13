import React, { useState, useEffect } from "react";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";


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

const ListadoPaginado = ({ tipo }) => {
  const [datos, setDatos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const history = useHistory();

  const token = cookies.get("token");
  const userDataCookie = cookies.get("user_data");
  const user_email = userDataCookie.user_email;

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
    <div>
      {/* Barra de paginación */}
      <div>
        {Array.from({ length: totalPaginas }).map((_, index) => (
          <button key={index} onClick={() => cambiarPagina(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      {/* Aquí renderizas tu lista con los datos en forma de tabla */}
      <StyledTable>
        <thead>
          <tr>
          <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Descripción</TableHeaderCell>
            <TableHeaderCell>Fecha creado</TableHeaderCell>
            <TableHeaderCell>Solicitudes</TableHeaderCell>
            <TableHeaderCell>Fecha confirmación</TableHeaderCell>
            <TableHeaderCell>Tiene solicitudes</TableHeaderCell>
            <TableHeaderCell>Editar</TableHeaderCell>
            <TableHeaderCell>Eliminar</TableHeaderCell>
            {/* Otros encabezados según el tipo */}
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item.id}>
              {/* Renderizar los detalles del elemento según el tipo */}
              {tipo === "donations" && (
                <>
                  <TableCell>{item.don_name}</TableCell>
                  <TableCell>{item.don_description}</TableCell>
                  <TableCell>{item.don_created_at}</TableCell>
                  <TableCell>
                    <Link to={`/listadorequestdon/${item.don_id}`}>{item.request_count}</Link>
                  </TableCell>
                  <TableCell>{item.don_confirmation_date}</TableCell>
                  <TableCell>{item.has_requests ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Link to={`/editardonacion/${item.don_id}`}>Editar</Link>
                  </TableCell>
                  <TableCell>
                  <button onClick={() => eliminarItem(item.don_id || item.id)}>
                       Eliminar
                  </button>
                  </TableCell>
                </>
              )}
              {tipo === "medicalequipments" && (
                <>
                  <TableCell>{item.eq_name}</TableCell>
                  <TableCell>{item.eq_description}</TableCell>
                  <TableCell>{item.don_created_at}</TableCell>
                  <TableCell>
                    <Link to={`/listadorequesteq/${item.eq_id}`}>{item.request_count}</Link>
                  </TableCell>
                  <TableCell>{item.eq_confirmation_date}</TableCell>
                  <TableCell>{item.has_requests ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Link to={`/editarequipamiento/${item.eq_id}`}>Editar</Link>
                  </TableCell>
                  <TableCell>
                  <button onClick={() => eliminarItem(item.eq_id || item.id)}>
                       Eliminar
                  </button>
                  </TableCell>
                </>
              )}
              {tipo === "volunteers" && (
                <>
                  <TableCell>{item.vol_name}</TableCell>
                  <TableCell>{item.vol_description}</TableCell>
                  <TableCell>{item.vol_created_at}</TableCell>
                  <TableCell>
                    <Link to={`/listadorequestvol/${item.vol_id}`}>{item.request_count}</Link>
                  </TableCell>
                  <TableCell>{item.has_requests ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Link to={`/editarvoluntario/${item.vol_id}`}>Editar</Link>
                  </TableCell>
                  <TableCell>
                  <button onClick={() => eliminarItem(item.vol_id || item.id)}>
                       Eliminar
                  </button>
                  </TableCell>
                </>
              )}
              {tipo === "sponsors" && (
                <>
                  <TableCell>{item.sponsor_name}</TableCell>
                  <TableCell>{item.sponsor_description}</TableCell>
                  <TableCell>{item.sponsor_created_at}</TableCell>
                  <TableCell>
                    <Link to={`/listadorequestsponsor/${item.sponsor_id}`}>{item.request_count}</Link>
                  </TableCell>
                  <TableCell>{item.confirmed_at}</TableCell>
                  <TableCell>{item.has_requests ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Link to={`/editarsponsor/${item.sponsor_id}`}>Editar</Link>
                  </TableCell>
                  <TableCell>
                  <button onClick={() => eliminarItem(item.sponsor_id || item.id)}>
                       Eliminar
                  </button>
                  </TableCell>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default ListadoPaginado;
