import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MenuComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top" style={{ backgroundColor: '#343a40' }}>
      <Navbar.Brand as={Link} to="/">Panel de Moderación</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/listadousuariosmod">Administración de Usuarios</Nav.Link>
        <Nav.Link as={Link} to="/listadonoticiasmod">Gestión de Contenido</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default MenuComponent;

