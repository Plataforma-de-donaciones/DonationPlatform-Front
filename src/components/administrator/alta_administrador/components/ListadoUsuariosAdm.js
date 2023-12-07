import { useState, useEffect } from "react";
import { Table, Button, Pagination, Form } from "react-bootstrap";
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import CardComponente from "../../../generales/card/CardComponente";
import Swal from "sweetalert2";

const cookies = new Cookies();

const ListadoUsuariosAdm = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
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
        const filteredUsers = response.data.filter(
          (user) => user.user_state === 1
        );

        setUsers(filteredUsers);
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

  const toggleUserSelection = (user) => {
    const isSelected = selectedUsers.some(
      (selectedUser) => selectedUser.id === user.id
    );
    if (isSelected) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
      );
    } else {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    }
  };

  const handleCreateAdministrator = async () => {
    try {
      if (selectedUsers.length === 0) {
        console.error(
          "No se ha seleccionado ningún usuario para crear el administrador."
        );
        return;
      }

      const user = selectedUsers[0];

      const administratorData = {
        user: user.id,
        organization: user.organization ? user.organization.id : null,
        start_date: new Date().toISOString(),
        administrator_state: 1,
      };

      console.log(administratorData);

      const response = await instance.post(
        "/administrators/",
        administratorData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        Swal.fire("¡Administrador registrado correctamente!", "", "success");
    
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        const errorMessage = error.response.data.detail;

        if (errorMessage === "Ya existe administrator con este user.") {
          Swal.fire("¡Ya existe un moderador para este usuario!", "", "info");
        } else {
          console.error("Error creando moderador:", errorMessage);
        }
      } else {
        console.error("Error creando moderador:", error);
      }
    }
  };

  return (
    <CardComponente
      titulo={"Crear administrador"}
      isTable
      footer={
        <>
          <Pagination
            className="justify-content-center"
            style={{ display: "flex" }}
          >
            <Pagination.First onClick={() => paginate(1)} />
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
              (_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
            <Pagination.Next onClick={() => paginate(currentPage + 1)} />
            <Pagination.Last
              onClick={() => paginate(Math.ceil(users.length / usersPerPage))}
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
                  checked={selectedUsers.some(
                    (selectedUser) => selectedUser.id === user.id
                  )}
                  onChange={() => toggleUserSelection(user)}
                />
              </td>
              <td>{user.user_name}</td>
              <td>{user.user_email}</td>
              <td>{user.organization ? user.organization.name : "N/A"}</td>
              <td>{user.user_state}</td>
              <td>{user.last_login}</td>
              <td>{user.erased_at || "N/A"}</td>
              <td>{user.erased_reason || "N/A"}</td>
              <td>
                <Button variant="primary" onClick={handleCreateAdministrator}>
                  Crear Administrador
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </CardComponente>
  );
};

export default ListadoUsuariosAdm;
