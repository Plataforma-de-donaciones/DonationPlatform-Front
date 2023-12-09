import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import instance from "../../../../axios_instance";

const cookies = new Cookies();

function GeneralHeader(props) {
  const { logout } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMenuOpenHam, setMenuOpenHam] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const history = useHistory();
  const isUserLoggedIn = cookies.get("token");
  const token = cookies.get("token");
  const userDataCookie = cookies.get("user_data");
  const user_id = userDataCookie ? userDataCookie.user_id : null;

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const toggleMenuHam = () => {
    setMenuOpenHam(!isMenuOpenHam);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "¿Está seguro que desea cerrar sesión?",
      text: "Esta acción lo redirige al login",
      icon: "question",
      iconHtml: "?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();

        cookies.remove("token");
        cookies.remove("user_data");

        setMenuOpen(false);

        history.push("/login");
      }
    });
  };
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user_id) {
        try {
          const response = await instance.post(
            `/users/searchrole/`,
            {
              id: user_id,
            },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          setUserRole(response.data.user_role);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    if (isUserLoggedIn && user_id) {
      fetchUserRole();
    }
  }, [isUserLoggedIn, user_id]);
  const renderUserIcon = () => {
    if (isUserLoggedIn && userRole) {
      return (
        <UserIcon>
          <ButtonOverlay onClick={toggleMenu}>
            <FontAwesomeIcon
              icon={faUser}
              style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                fontSize: "24px",
              }}
              title="Usuario"
            />
          </ButtonOverlay>
          {isMenuOpen && (
             <DropdownMenu>
              <MenuItem>
                <Link to="/modificacion">Mi cuenta</Link>
              </MenuItem>
              {userRole === "administrator" && (
                <MenuItem>
                  <Link to="/paneladministrador">Panel de Administrador</Link>
                </MenuItem>
              )}
              {userRole === "moderator" && (
                <MenuItem>
                  <Link to="/panelmoderador">Panel de Moderador</Link>
                </MenuItem>
              )}
              <MenuItem>
                <Button onClick={handleLogout}>Cerrar sesión</Button>
              </MenuItem>
            </DropdownMenu>
          )}
        </UserIcon>
      );
    } else {
      return (
        <StyledLink to="/login">
          <UserIcon>
            <ButtonOverlay>
              <FontAwesomeIcon
                icon={faSignInAlt}
                style={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  fontSize: "24px",
                }}
                title="Iniciar sesión"
              />
            </ButtonOverlay>
          </UserIcon>
        </StyledLink>
      );
    }
  };
  return (
    <Container {...props}>
      {isUserLoggedIn && (
        <MenuIcon>
          <ButtonOverlay onClick={toggleMenuHam}>
            <FontAwesomeIcon
              icon={faBars}
              style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                fontSize: "24px",
              }}
              title="Menú"
            />
          </ButtonOverlay>
          {isMenuOpenHam && (
            <DropdownMenuContainer>
            <DropdownMenuHam>
              <MenuItem>
                <Link to="/listaconversaciones">Mis conversaciones</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/listadosolicitudes">Mis solicitudes</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/listadoofrecimientos">Mis ofrecimientos</Link>
              </MenuItem>
            </DropdownMenuHam>
            </DropdownMenuContainer>
          )}
        </MenuIcon>
      )}

      <div className="mx-auto">
        <LogoContainer>
          <LogoContent>
            <Link to="/inicio">
              <Isotype
                src={require("../assets/images/logopngcompleto.png")}
                alt="Logo"
              />
            </Link>
          </LogoContent>
        </LogoContainer>
      </div>
      {renderUserIcon()}
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  top: 0;
  left: 0;
  position: sticky;
  justify-content: space-between;
  align-items: center;

  background-color: rgba(79, 181, 139, 1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 1rem;

  width: 100%;
  height: 80px;
  min-width: 443px;

  z-index: 9999; 

  @media (max-width: 443px) {
    flex-direction: row;
    align-items: center;
    padding: 0.5rem;
    justify-content: center;
  }
  @media (min-width: 532px) {
    min-width: 532px;
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
margin: auto;
@media (max-width: 443px) {
  margin-left: 3rem; 
}
`;

const LogoContent = styled.div`
  display: flex;
  align-items: center;
`;

const Isotype = styled.img`
  width: 325px;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  align-items: center;

@media (max-width: 443px) {
  max-width: 80%;
  

}  
`;

const LogoText = styled.span`
  @media (min-width: 10px) {
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
  flex-grow: 0.1px;
`;

const DropdownMenu = styled.ul`
  position: fixed;
  top: 80px; 
  right: 0;
  width: 11.7rem;
  text-align: left; 
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: "Arial";
  font-size: 1rem;
  z-index: 9999;
`;

const DropdownMenuHam = styled.ul`
  position: fixed;
  top: 80px; /* Ajusta la posición vertical según sea necesario */
  left: 0;
  width: 11.7rem;
  text-align: left;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: "Arial";
  font-size: 1rem;
  z-index: 9999;
`;
const DropdownMenuContainer = styled.div`
  position: fixed;
  z-index: 1000;
`;

const MenuItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ccc;

  a {
    text-decoration: none;
    color: rgba(80, 80, 80, 1);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(80,80,80, 1);
  font-family: "Arial";
  font-size: 1rem;
  right: 0;
  padding: 0;
  margin: 0;
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
  text-decoration: none;
  color: #ffffff;
`;

export default GeneralHeader;
