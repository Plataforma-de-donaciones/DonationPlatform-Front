import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Pagination, Form } from 'react-bootstrap';
import instance from '../../../../axios_instance';
import Cookies from 'universal-cookie';
import MenuComponent from '../../list_users/components/MenuComponent';
import { useHistory } from 'react-router-dom';

const cookies = new Cookies();

const ListadoAdministradores = () => {
  const [administrators, setAdministrators] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [administratorsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const token = cookies.get("token");
  const history = useHistory();

  useEffect(() => {
    const fetchAdministrators = async () => {
      try {
        const response = await instance.get('/administrators/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAdministrators(response.data);
      } catch (error) {
        console.error('Error fetching administrators:', error);
      }
    };

    fetchAdministrators();
  }, [token]);

  const eliminarAdministrador = async (administratorId) => {
    const confirmacion = window.confirm(`¿Desea eliminar el administrador?`);

    if (confirmacion) {
      try {
        await instance.delete(`/administrators/${administratorId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAdministrators((prevAdministrators) =>
          prevAdministrators.filter((administrator) => administrator.id !== administratorId)
        );
      } catch (error) {
        console.error('Error al eliminar administrador:', error);
      }
    }
  };

  const indexOfLastAdministrator = currentPage * administratorsPerPage;
  const indexOfFirstAdministrator = indexOfLastAdministrator - administratorsPerPage;
  const filteredAdministrators = administrators.filter((administrator) =>
    administrator.user_info.user_email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentAdministrators = filteredAdministrators.slice(
    indexOfFirstAdministrator,
    indexOfLastAdministrator
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCreateAdministrator = () => {
    history.push('/altaadministrador');
  };

  return (
    <Container style={{ border: '1px solid lightgray', padding: '20px', marginTop: '50px', textAlign: 'center' }}>
      <MenuComponent />
      <div className="mb-4">
        <h2 className="h2">Listado de Administradores</h2>
      </div>
      <Button variant="primary" onClick={handleCreateAdministrator} style={{ marginBottom: '20px' }}>
        Crear administrador
      </Button>
      
      <Form.Group controlId="formSearch">
        <Form.Control
          type="text"
          placeholder="Buscar por correo de usuario"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Fecha de inicio</th>
            <th>Organización</th>
            <th>Estado</th>
            <th>Fecha de borrado</th>
            <th>Razón de borrado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {currentAdministrators.map((administrator) => (
            <tr key={administrator.id}>
              <td>{administrator.user_info.user_email}</td>
              <td>{administrator.start_date}</td>
              <td>{administrator.organization ? administrator.organization.name : 'N/A'}</td>
              <td>{administrator.state}</td>
              <td>{administrator.erased_at || 'N/A'}</td>
              <td>{administrator.erased_reason || 'N/A'}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => eliminarAdministrador(administrator.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center" style={{ display: 'flex' }}>
        <Pagination.First onClick={() => paginate(1)} />
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
        {Array.from({ length: Math.ceil(filteredAdministrators.length / administratorsPerPage) }).map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} />
        <Pagination.Last
          onClick={() =>
            paginate(Math.ceil(filteredAdministrators.length / administratorsPerPage))
          }
        />
      </Pagination>
    </Container>
  );
};

export default ListadoAdministradores;
