import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'https://192.168.1.14',
  timeout: 5000,
  withCredentials: true, // Agrega esta línea para habilitar el uso de cookies de sesión
  validateStatus: function (status) {
    return status >= 200 && status < 501; // Aceptar solo códigos de estado en el rango 200-299
  },
});

// Otras configuraciones específicas de esta instancia

export default instance;
