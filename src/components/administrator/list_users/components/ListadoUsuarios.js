import { useState, useEffect } from "react";
import { Table, Button, Pagination, Form } from "react-bootstrap";
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import CardComponente from "./../../../generales/card/CardComponente";

const cookies = new Cookies();

const ListadoUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const token = cookies.get("token");
  const history = useHistory();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get("/users/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter((user) =>
    user.user_email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleEditUser = (userId) => {
    history.push(`/editarusuario/${userId}`);
  };

  const handleToggleUserState = async (userId, currentState) => {
    try {
      const newUserState = currentState === 1 ? 0 : 1;

      await instance.patch(
        `/users/${userId}/`,
        { user_state: newUserState },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, user_state: newUserState } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
    }
  };

  return (
    <>
      <CardComponente
        titulo={"Listado de Usuarios"}
        isTable={true}
        footer={
          <>
            <Pagination
              className="justify-content-center"
              style={{ display: "flex" }}
            >
              <Pagination.First onClick={() => paginate(1)} />
              <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
              {Array.from({
                length: Math.ceil(filteredUsers.length / usersPerPage),
              }).map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => paginate(currentPage + 1)} />
              <Pagination.Last
                onClick={() =>
                  paginate(Math.ceil(filteredUsers.length / usersPerPage))
                }
              />
            </Pagination>
          </>
        }
      >
        <Form.Group className="mb-3">
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
                <td>{user.organization ? user.organization.name : "N/A"}</td>
                <td>{user.user_state}</td>
                <td>{user.last_login}</td>
                <td>{user.erased_at || "N/A"}</td>
                <td>{user.erased_reason || "N/A"}</td>
                <td>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEditUser(user.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant={user.user_state === 1 ? "danger" : "success"}
                    size="sm"
                    onClick={() =>
                      handleToggleUserState(user.id, user.user_state)
                    }
                  >
                    {user.user_state === 1 ? "Deshabilitar" : "Habilitar"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardComponente>
    </>
  );
};

export default ListadoUsuarios;
