import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 152, 0, 0.8);
  padding: 1rem;
  width: 100%;
  height: 50px;
  flex-wrap: wrap; /* Permite que los elementos se envuelvan a la siguiente línea si no caben en el ancho disponible */
`;

const MenuItem = styled(Link)`
  padding: 10px;
  margin-right: 10px;
  text-decoration: none;
  color: #8b4513; /* Color más oscuro que el fondo */
  font-weight: bold;

  &:hover {
    background-color: #8b4513; /* Color más oscuro que el fondo al pasar el mouse */
    color: #fff;
  }

  &:not(:last-child) {
    margin-right: 20px; /* Ajusta la distancia entre elementos */
    margin-bottom: 10px; /* Añade espacio inferior entre elementos */
  }

  @media (max-width: 768px) {
    width: 100%; /* Ocupa todo el ancho en dispositivos más pequeños */
    margin-right: 0; /* Elimina el margen derecho para que los elementos ocupen todo el ancho disponible */
  }
`;

const Menu = () => {
  return (
    <MenuContainer>
      <MenuItem to="/inicio">Noticias y destacados</MenuItem>
      <MenuItem to="/listadoequipamiento">Equipamiento médico</MenuItem>
      <MenuItem to="/donaciones-generales">Donaciones generales</MenuItem>
      <MenuItem to="/voluntarios-padrinos">Voluntarios y Padrinos</MenuItem>
      <MenuItem to="/eventos">Eventos</MenuItem>
    </MenuContainer>
  );
};

export default Menu;
