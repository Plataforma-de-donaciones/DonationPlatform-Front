import { useState, useEffect } from "react";
import { Table, Button, Pagination, Form } from "react-bootstrap";
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import CardComponente from "./../../../generales/card/CardComponente";
import Swal from "sweetalert2";

const cookies = new Cookies();

const ListadoModeradores = () => {
  const [moderators, setModerators] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moderatorsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const token = cookies.get("token");
  const history = useHistory();

  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await instance.get("/moderators/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setModerators(response.data);
      } catch (error) {
        console.error("Error fetching moderators:", error);
      }
    };

    fetchModerators();
  }, [token]);

  const eliminarModerador = async (moderatorId) => {
    const confirmation = await Swal.fire({
      title: "¿Está seguro que desea eliminar el moderador?",
      text: "¡Le quitará el rol al usuario!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });
    if (confirmation.isConfirmed) {

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
        console.error("Error al eliminar moderador:", error);
      }
    }
  };

  const indexOfLastModerator = currentPage * moderatorsPerPage;
  const indexOfFirstModerator = indexOfLastModerator - moderatorsPerPage;
  const filteredModerators = moderators.filter((moderator) =>
    moderator.user_info.user_email
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const currentModerators = filteredModerators.slice(
    indexOfFirstModerator,
    indexOfLastModerator
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCreateModerator = () => {
    history.push("/altamoderador");
  };

  return (
      <CardComponente
        isTable={true}
        titulo={"Moderadores"}
        footer={
          <>
            <Pagination
              className="justify-content-center"
              style={{ display: "flex" }}
            >
              <Pagination.First onClick={() => paginate(1)} />
              <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
              {Array.from({
                length: Math.ceil(moderators.length / moderatorsPerPage),
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
                  paginate(Math.ceil(moderators.length / moderatorsPerPage))
                }
              />
            </Pagination>
          </>
        }
      >
        <Button
          variant="primary"
          onClick={handleCreateModerator}
          style={{ marginBottom: "20px" }}
        >
          Crear moderador
        </Button>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Buscar por correo de usuario"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>

        <Table striped bordered hover responsive>
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
                <td>
                  {moderator.organization ? moderator.organization.name : "N/A"}
                </td>
                <td>{moderator.state}</td>
                <td>{moderator.erased_at || "N/A"}</td>
                <td>{moderator.erased_reason || "N/A"}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => eliminarModerador(moderator.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardComponente>
  );
};

export default ListadoModeradores;
