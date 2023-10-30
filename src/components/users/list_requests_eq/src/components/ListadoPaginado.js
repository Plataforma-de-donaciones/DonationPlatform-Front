import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import instance from "../../../../../axios_instance";
import Cookies from "universal-cookie";
import styled from "styled-components";

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
  const [idEnEdicion, setIdEnEdicion] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const token = cookies.get("token");
  const userDataCookie = cookies.get("user_data");
  const user_email = userDataCookie.user_email;

  const editarItem = (idField, id) => {
    setIdEnEdicion(id);

    // Cambia la redirección a una URL que incluya el parámetro en la ruta
    switch (tipo) {
      case "medicalequipments":
        history.push(`/editarequipamiento/${id}`);
        break;
      case "donations":
        // Reemplaza 'editardonacion' con la ruta correcta para tu caso
        history.push(`/editarequipamiento/${id}`);
        break;
      // Agrega casos para otros tipos si es necesario
      default:
        break;
    }
  };

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
    const confirmacion = window.confirm(`¿Desea eliminar el ${tipo}?`);

    if (confirmacion) {
      try {
        await instance.delete(`/${tipo}/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        obtenerDatos();
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

      {/* Renderiza la lista con los datos en forma de tabla */}
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
              {/* Renderiza los detalles del elemento según el tipo */}
              {tipo === "donations" && (
                <>
                  <TableCell>{item.don_name}</TableCell>
                  <TableCell>{item.don_description}</TableCell>
                  <TableCell>{item.don_created_at}</TableCell>
                  <TableCell>{item.request_count}</TableCell>
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
                  <TableCell>{item.request_count}</TableCell>
                  <TableCell>{item.eq_confirmation_date}</TableCell>
                  <TableCell>{item.has_requests ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {/* Usa Link para enlazar a la página de edición con el parámetro en la URL */}
                    <Link to={`/editarequipamiento/${item.eq_id}`}>Editar</Link>
                  </TableCell>
                  <TableCell>
                  <button onClick={() => eliminarItem(item.eq_id || item.id)}>
                       Eliminar
                  </button>
                  </TableCell>
                </>
              )}
              {/* Otros tipos */}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default ListadoPaginado;
