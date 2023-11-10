import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const MenuContainer = styled.div`
  @media (min-width: 1px) {
    display: flex;
    top: 80px;
    left: 0;
    position: fixed;
    justify-content: space-between;
    
    background-color: rgba(80,80,80, 1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding-right: 1rem; 
    padding-left: 1rem;
    
    width: 100%;
    height: 50px;
  }

  @media (max-width: 800px) {
    padding-right: 0.5rem; 
    padding-left: 0.5rem;
  }

  @media (max-width: 702px) {
    height: 70px;
  }
`;

const MenuItem = styled(Link)`
  color: #FFFFFF;
  text-decoration: none;
  padding-top: 1rem; 
  
  &:hover {
    color: rgba(79,181,139, 1);
  }

  @media (max-width: 787px) {
    padding-right: 0.5rem; 
    padding-left: 0.5rem;
    font-size: 14px;
  }
`;

export default Menu;

