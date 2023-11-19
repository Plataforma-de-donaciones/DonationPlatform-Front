import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Pagination, Form } from 'react-bootstrap';
import instance from '../../../../axios_instance';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuComponent from './MenuComponent';
import { useHistory } from 'react-router-dom';

const cookies = new Cookies();

const ListadoUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const token = cookies.get('token');
  const history = useHistory();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get('/users/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const filteredUsers = response.data.filter((user) => user.user_state === 1);

      setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter((user) =>
    user.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleUserSelection = (user) => {
    const isSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id);
    if (isSelected) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
      );
    } else {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    }
  };

  const handleCreateModerators = async () => {
    try {
      if (selectedUsers.length === 0) {
        console.error('No se ha seleccionado ningún usuario para crear el moderador.');
        return;
      }
  
      const user = selectedUsers[0];
  
      const moderatorData = {
        user: user.id,
        organization: user.organization ? user.organization.id : null,
        start_date: new Date().toISOString(),
        moderator_state: 1,
      };
  
      console.log(moderatorData);
  
      const response = await instance.post(
        '/moderators/',
        moderatorData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 201) {
        alert("Donación registrada correctamente");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        const errorMessage = error.response.data.detail;
  
        if (errorMessage === 'Ya existe moderator con este user.') {
          alert('Ya existe un moderador para este usuario.');
        } else {
          console.error('Error creando moderador:', errorMessage);
        }
      } else {
        console.error('Error creando moderador:', error);
      }
    }
  };
  

  return (
    <Container style={{ border: '1px solid lightgray', padding: '20px', marginTop: '50px', textAlign: 'center' }}>
      <MenuComponent></MenuComponent>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar por nombre de usuario"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Seleccionar</th>
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
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedUsers.some((selectedUser) => selectedUser.id === user.id)}
                  onChange={() => toggleUserSelection(user)}
                />
              </td>
              <td>{user.user_name}</td>
              <td>{user.user_email}</td>
              <td>{user.organization ? user.organization.name : 'N/A'}</td>
              <td>{user.user_state}</td>
              <td>{user.last_login}</td>
              <td>{user.erased_at || 'N/A'}</td>
              <td>{user.erased_reason || 'N/A'}</td>
              <td>
                <Button variant="primary" onClick={handleCreateModerators}>
                  Crear Moderador
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
