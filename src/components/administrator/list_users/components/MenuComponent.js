import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const MenuComponent = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      style={{ backgroundColor: "#343a40" }}
    >
      <Navbar.Brand className="ms-3" as={Link} to="/">
        Panel de Administración
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
 
          <Nav.Link as={Link} to="/listadomoderadores">
            Gestión de Moderadores
          </Nav.Link>
          <Nav.Link as={Link} to="/listadoadministradores">
            Gestión de Administradores
          </Nav.Link>
          <Nav.Link as={Link} to="/listadonoticias">
            Gestión de Contenido
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MenuComponent;
