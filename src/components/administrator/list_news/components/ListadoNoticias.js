import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Pagination } from 'react-bootstrap';
import instance from '../../../../axios_instance';
import Cookies from 'universal-cookie';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom'; 
import MenuComponent from '../../list_users/components/MenuComponent';


const cookies = new Cookies();

const ListadoNoticias = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10); 
  const token = cookies.get("token");
  const history = useHistory();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await instance.get('/news/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [token]);

  const indexOfLastUser = currentPage * newsPerPage;
  const indexOfFirstUser = indexOfLastUser - newsPerPage;
  const currentUsers = news.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleCreateNews = () => {
    history.push('/altanoticia');
  };
  const handleEditNews = (newsId) => {
    history.push(`/editarnoticia/${newsId}`);
  };

  return (
    
    <Container style={{ border: '1px solid lightgray', padding: '20px', marginTop: '50px', textAlign: 'center' }}>
      <MenuComponent></MenuComponent>
      <Button variant="primary" onClick={handleCreateNews} style={{ marginBottom: '20px' }}>
        Crear noticia
      </Button>
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
          {currentUsers.map((news) => (
            <tr key={news.id}>
              <td>{news.new_name}</td>
              <td>{news.new_description}</td>
              <td>{news.new_subject}</td>
              <td>{news.is_highlighted}</td>
              <td>{news.views_count}</td>
              <td>{news.user}</td>
              <td>{news.new_created_at}</td>
              <td>
              <Button variant="info" size="sm" onClick={() => handleEditNews(news.new_id)}>
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
        {Array.from({ length: Math.ceil(news.length / newsPerPage) }).map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} />
        <Pagination.Last onClick={() => paginate(Math.ceil(news.length / newsPerPage))} />
      </Pagination>
    </Container>
  );
};

export default ListadoNoticias;
