import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Alerta = ({ message }) => {
  useEffect(() => {
    toast(message);
  }, [message]);

  return <></>; // No necesitas un elemento raíz en este componente
};

export default Alerta;
