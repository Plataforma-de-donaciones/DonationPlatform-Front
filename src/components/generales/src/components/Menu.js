import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(190, 219, 57, 0.50);
  padding: 1rem;
  height: 50px;
  flex-wrap: wrap; /* Permite que los elementos se envuelvan a la siguiente línea si no caben en el ancho disponible */
  overflow: hidden; /* Oculta cualquier contenido que desborde del contenedor */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled(Link)`
  padding: 10px;
  margin-right: 10px;
  text-decoration: none;
  color: #454A2C; /* Color más oscuro que el fondo */
  font-weight: bold;

  &:hover {
    background-color: #454A2C; /* Color más oscuro que el fondo al pasar el mouse */
    color: #fff;
  }

  &:not(:last-child) {
    margin-right: 20px; /* Ajusta la distancia entre elementos */
    margin-bottom: 10px; /* Añade espacio inferior entre elementos */
  }

  @media (max-width: 768px) {
    width: 100%; /* Ocupa todo el ancho en dispositivos más pequeños */
    margin-right: 0; /* Elimina el margen derecho para que los elementos ocupen todo el ancho disponible */
    display: ${(props) => (props.showOnMobile ? "block" : "none")}; /* Controla la visibilidad en dispositivos móviles */
  }
`;

const Menu = () => {
  return (
    <MenuContainer>
      <MenuItem to="/inicio" showOnMobile={true}>
        Noticias y destacados
      </MenuItem>
      <MenuItem to="/listadoequipamiento" showOnMobile={true}>
        Equipamiento médico
      </MenuItem>
      <MenuItem to="/listadodonacion" showOnMobile={true}>
        Donaciones generales
      </MenuItem>
      <MenuItem to="/listadovoluntariado" showOnMobile={true}>
        Voluntarios y Padrinos
      </MenuItem>
      <MenuItem to="/eventos" showOnMobile={true}>
        Eventos
      </MenuItem>
    </MenuContainer>
  );
};

export default Menu;

