import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import ImagenUploader from './ImagenUploader';
import Cookies from 'universal-cookie';
import instance from '../../../../axios_instance';
import Swal from "sweetalert2";

const cookies = new Cookies();

const CrearNews = () => {
  const [newsData, setNewsData] = useState({
    new_name: '',
    new_description: '',
    new_subject: '',
    is_highlight: false,
    user: '',
    new_created_at: new Date().toISOString(),
    attachments: null,
  });

  const [file, setFile] = useState(null);
  const [user_id, setUserId] = useState(null);

  const token = cookies.get("token");

  useEffect(() => {
    const userDataCookie = cookies.get("user_data");
    if (userDataCookie) {
      setUserId(userDataCookie.user_id);
    }
  }, []);

  useEffect(() => {
    setNewsData((prevData) => ({
      ...prevData,
      user: user_id || "",
    }));
  }, [user_id]);


  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (file) {
        formData.append('attachments', file);
      }

      Object.entries(newsData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await instance.post("/news/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data", 
        },
      });

      if (response.status === 201) {
        Swal.fire("¡Noticia registrada correctamente!", "", "success");
        history.push("/listadonoticiasmod");
      } else {
        const serverError = await response.json();
        console.log(response);
        if (serverError) {
        } else {
        }
      }
    } catch (error) {
      console.error('Error al registrar noticia:', error);
      console.log('Respuesta del servidor:', error.response);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="new_name">
        <Form.Label>Nombre de la noticia</Form.Label>
        <Form.Control
          type="text"
          name="new_name"
          value={newsData.new_name}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="new_description">
        <Form.Label>Descripción de la noticia</Form.Label>
        <Form.Control
          type="text"
          name="new_description"
          value={newsData.new_description}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="new_subject">
        <Form.Label>Tema de la noticia</Form.Label>
        <Form.Control
          type="text"
          name="new_subject"
          value={newsData.new_subject}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <ImagenUploader onFileChange={handleFileChange} />

      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  );
};

export default CrearNews;
