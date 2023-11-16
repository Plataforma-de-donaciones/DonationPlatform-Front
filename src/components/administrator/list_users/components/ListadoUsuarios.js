import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Pagination } from 'react-bootstrap';
import instance from '../../../../axios_instance';
import Cookies from 'universal-cookie';
//import 'bootstrap/dist/css/bootstrap.min.css';
import MenuComponent from './MenuComponent';


const cookies = new Cookies();

const ListadoUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); 
  const token = cookies.get("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get('/users/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    
    <Container style={{ border: '1px solid lightgray', padding: '20px', marginTop: '50px', textAlign: 'center' }}>
      <MenuComponent></MenuComponent>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre de usuario</th>
            <th>Email</th>
            <th>Organización</th>
            <th>Estado</th>
            <th>Último login</th>
            <th>Fecha de borrado</th>
            <th>Razón de borrado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.user_name}</td>
              <td>{user.user_email}</td>
              <td>{user.organization ? user.organization.name : 'N/A'}</td>
              <td>{user.user_state}</td>
              <td>{user.last_login}</td>
              <td>{user.erased_at || 'N/A'}</td>
              <td>{user.erased_reason || 'N/A'}</td>
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
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} />
        <Pagination.Last onClick={() => paginate(Math.ceil(users.length / usersPerPage))} />
      </Pagination>
    </Container>
  );
};

export default ListadoUsuarios;
