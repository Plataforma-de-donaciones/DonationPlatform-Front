import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";
import Cookies from "universal-cookie";
import Swal from 'sweetalert2';

const cookies = new Cookies();

function GeneralHeader(props) {
  const { logout } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const history = useHistory();
  const isUserLoggedIn = cookies.get('token'); // Verifica la existencia de la cookie de sesión

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Realizar acciones necesarias antes de cerrar sesión
    // ...
    Swal.fire({
      title: '¿Está seguro que desea cerrar sesión?',
      text: 'Esta acción lo devolverá al login',
      icon: 'question',
      iconHtml: '?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();

        cookies.remove('token');
        cookies.remove('user_data');

        // Cerrar el menú desplegable
        setMenuOpen(false);

        history.push('/login');
      }
    });

  };

  return (
    <Container {...props}>
      {isUserLoggedIn && (
        <MenuIcon>
          <ButtonOverlay onClick={props.onMenuClick}>
            <FontAwesomeIcon
              icon={faBars}
              style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                fontSize: "24px",
              }}
            />
          </ButtonOverlay>
        </MenuIcon>
      )}

      <LogoContainer>
        <LogoContent>
          <Link to="/inicio">
            <Isotype src={require("../assets/images/logowhite1.png")} alt="Logo" />
          </Link>
          <LogoText>
            <StyledLink to="/inicio">DonacionesUy</StyledLink>
          </LogoText>
        </LogoContent>
      </LogoContainer>
      {isUserLoggedIn && ( // Renderiza solo si el usuario está conectado
        <UserIcon>
          <ButtonOverlay onClick={toggleMenu}>
            <FontAwesomeIcon
              icon={faUser}
              style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                fontSize: "24px",
              }}
            />
          </ButtonOverlay>
          {isMenuOpen && (
            <DropdownMenu>
              <MenuItem>
                <Link to="/modificacion">Mi cuenta</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/listadosolicitudes">Mis solicitudes</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/listadoofrecimientos">Mis ofrecimientos</Link>
              </MenuItem>
              <MenuItem>
                <Button onClick={handleLogout}>Cerrar sesión</Button>
              </MenuItem>
            </DropdownMenu>
          )}
        </UserIcon>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(79,181,139, 1);
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  position: sticky;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  top: 0;
  z-index: 9999;
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ButtonOverlay = styled.button`
  display: block;
  background: none;
  height: 100%;
  width: 100%;
  border: none;
  cursor: pointer;
  z-index: 2000;

`;

const MenuIcon = styled.div`
  padding: 0.5rem;
  width: 2.5rem;
  border: none;
  flex-grow: 0.1px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoContent = styled.div`
  display: flex;
  align-items: center;
`;

const Isotype = styled.img`
  width: 80px;
  height: auto;
  object-fit: contain;
  align-items: center;

  @media (min-width: 10px) {
    width: 80px;
    height: auto;
    object-fit: contain;
    align-items: center;
    margin-bottom: 0.5rem;
  }
`;

const LogoText = styled.span`
  font-family: "Gloria Hallelujah", cursive;
  font-size: 2rem;
  color: #FFFFFF;
  background-color: transparent;
  font-weight: 400;
  text-align: center;

  @media (max-width: 768px) {
    margin-left: 0;
    font-family: "Gloria Hallelujah", cursive;
    font-size: 2rem;
    color: #FFFFFF;
    background-color: transparent;
    font-weight: 400;
    text-align: center;
  }
`;

const UserIcon = styled.div`
  position: relative;
  padding: 0.5rem;
  width: 2.5rem;
  border: none;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  width: 9.4rem;
  text-align: right;
  background-color: #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: "Roboto";
  font-size: 1rem;
`;


const MenuItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ccc;

  a {
    text-decoration: none;
    color: rgba(80,80,80, 1);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
`;
const NavMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const NavItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ccc;

  a {
    text-decoration: none;
    color: #333;
  }

  &:last-child {
    border-bottom: none;
  }
`;
const StyledLink = styled(Link)`
  /* Puedes agregar estilos específicos si es necesario */
  text-decoration: none;
  color: #FFFFFF;
`;

export default GeneralHeader;
