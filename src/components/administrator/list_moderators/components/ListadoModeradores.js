import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Pagination } from 'react-bootstrap';
import instance from '../../../../axios_instance';
import Cookies from 'universal-cookie';
//import 'bootstrap/dist/css/bootstrap.min.css';
import MenuComponent from '../../list_users/components/MenuComponent';


const cookies = new Cookies();

const ListadoModeradores = () => {
  const [moderators, setModerators] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moderatorsPerPage] = useState(10); 
  const token = cookies.get("token");

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

  const indexOfLastUser = currentPage * moderatorsPerPage;
  const indexOfFirstUser = indexOfLastUser - moderatorsPerPage;
  const currentUsers = moderators.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    
    <Container style={{ border: '1px solid lightgray', padding: '20px', marginTop: '50px', textAlign: 'center' }}>
      <MenuComponent></MenuComponent>
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
          {currentUsers.map((moderator) => (
            <tr key={moderator.id}>
              <td>{moderator.user}</td>
              <td>{moderator.start_date}</td>
              <td>{moderator.organization ? moderator.organization.name : 'N/A'}</td>
              <td>{moderator.state}</td>
              <td>{moderator.erased_at || 'N/A'}</td>
              <td>{moderator.erased_reason || 'N/A'}</td>
              <td>
                <Button variant="info" size="sm">
                  Editar
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
