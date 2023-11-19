import { useState, useEffect } from "react";
import { Table, Button, Pagination, Form } from "react-bootstrap";
import instance from "../../../../axios_instance";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import CardComponente from "../../../generales/card/CardComponente";

const cookies = new Cookies();

const ListadoNoticias = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const token = cookies.get("token");
  const history = useHistory();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await instance.get("/news/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [token]);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const filteredNews = news.filter(
    (newsItem) =>
      newsItem.new_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      newsItem.new_description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      newsItem.new_subject.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleCreateNews = () => {
    history.push("/altanoticiamod");
  };
  const handleEditNews = (newsId) => {
    history.push(`/editarnoticiamod/${newsId}`);
  };

  const handleHighlight = async (newsId) => {
    try {
      const formData = new FormData();
      formData.append("is_highlighted", true);

      const response = await instance.patch(`/news/${newsId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });

      console.log("Respuesta del servidor:", response.data);
      const updatedNews = news.map((item) =>
        item.new_id === newsId ? { ...item, is_highlighted: true } : item
      );
      setNews(updatedNews);
    } catch (error) {
      console.error("Error al destacar la noticia:", error);
    }
  };
  const handleNotHighlight = async (newsId) => {
    try {
      const formData = new FormData();
      formData.append("is_highlighted", false);

      const response = await instance.patch(`/news/${newsId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });

      console.log("Respuesta del servidor:", response.data);
      const updatedNews = news.map((item) =>
        item.new_id === newsId ? { ...item, is_highlighted: false } : item
      );
      setNews(updatedNews);
    } catch (error) {
      console.error("Error al destacar la noticia:", error);
    }
  };

  return (
    <CardComponente
      isTable
      titulo={"Noticias"}
      footer={
        <>
          <Pagination
            className="justify-content-center"
            style={{ display: "flex" }}
          >
            <Pagination.First onClick={() => paginate(1)} />
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
            {Array.from({
              length: Math.ceil(filteredNews.length / newsPerPage),
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
                paginate(Math.ceil(filteredNews.length / newsPerPage))
              }
            />
          </Pagination>
        </>
      }
    >
      <Button
        variant="primary"
        onClick={handleCreateNews}
        style={{ marginBottom: "20px" }}
      >
        Crear noticia
      </Button>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar por título, descripción o asunto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Asunto</th>
            <th>Es destacada</th>
            <th>Cantidad de vistas</th>
            <th>Usuario</th>
            <th>Fecha creado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {currentNews.map((newsItem) => (
            <tr key={newsItem.new_id}>
              <td>{newsItem.new_name}</td>
              <td>{newsItem.new_description}</td>
              <td>{newsItem.new_subject}</td>
              <td>{newsItem.is_highlighted ? "Sí" : "No"}</td>
              <td>{newsItem.views_count}</td>
              <td>{newsItem.user}</td>
              <td>{newsItem.new_created_at}</td>
              <td>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEditNews(newsItem.new_id)}
                >
                  Editar
                </Button>
                {!newsItem.is_highlighted && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleHighlight(newsItem.new_id)}
                  >
                    Destacar
                  </Button>
                )}
                {newsItem.is_highlighted && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleNotHighlight(newsItem.new_id)}
                  >
                    No Destacar
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </CardComponente>
  );
};

export default ListadoNoticias;
