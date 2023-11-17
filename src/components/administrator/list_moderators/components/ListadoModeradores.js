import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Pagination, Form } from 'react-bootstrap';
import instance from '../../../../axios_instance';
import Cookies from 'universal-cookie';
//import 'bootstrap/dist/css/bootstrap.min.css';
import MenuComponent from '../../list_users/components/MenuComponent';
import { useHistory } from 'react-router-dom';



const cookies = new Cookies();

const ListadoModeradores = () => {
  const [moderators, setModerators] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moderatorsPerPage] = useState(10); 
  const [searchTerm, setSearchTerm] = useState('');
  const token = cookies.get("token");
  const history = useHistory();


  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await instance.get('/moderators/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setModerators(response.data);
      } catch (error) {
        console.error('Error fetching moderators:', error);
      }
    };

    fetchModerators();
  }, [token]);

  const eliminarModerador = async (moderatorId) => {
    const confirmacion = window.confirm(`¿Desea eliminar el moderador?`);

    if (confirmacion) {
      try {
        await instance.delete(`/moderators/${moderatorId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setModerators((prevModerators) =>
        prevModerators.filter((moderator) => moderator.id !== moderatorId)
      );
      } catch (error) {
        console.error('Error al eliminar moderador:', error);
      }
    }
  };

  const indexOfLastModerator = currentPage * moderatorsPerPage;
  const indexOfFirstModerator = indexOfLastModerator - moderatorsPerPage;
  const filteredModerators = moderators.filter((moderator) =>
    moderator.user_info.user_email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentModerators = filteredModerators.slice(indexOfFirstModerator, indexOfLastModerator);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCreateModerator = () => {
    history.push('/altamoderador');
  };

  return (
    
    <Container style={{ border: '1px solid lightgray', padding: '20px', marginTop: '50px', textAlign: 'center' }}>
      <MenuComponent></MenuComponent>
      <div className="mb-4">
      <h2 className="h2">Listado de Moderadores</h2>      
      </div>
      <Button variant="primary" onClick={handleCreateModerator} style={{ marginBottom: '20px' }}>
        Crear moderador
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
        {currentModerators.map((moderator) => (
            <tr key={moderator.id}>
              <td>{moderator.user_info.user_email}</td>
              <td>{moderator.start_date}</td>
              <td>{moderator.organization ? moderator.organization.name : 'N/A'}</td>
              <td>{moderator.state}</td>
              <td>{moderator.erased_at || 'N/A'}</td>
              <td>{moderator.erased_reason || 'N/A'}</td>
              <td>
              <Button variant="info" size="sm" onClick={() => eliminarModerador(moderator.id)}>
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
        {Array.from({ length: Math.ceil(moderators.length / moderatorsPerPage) }).map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} />
        <Pagination.Last onClick={() => paginate(Math.ceil(moderators.length / moderatorsPerPage))} />
      </Pagination>
    </Container>
  );
};

export default ListadoModeradores;
