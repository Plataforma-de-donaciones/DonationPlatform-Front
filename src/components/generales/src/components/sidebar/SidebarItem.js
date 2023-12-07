import { Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ nombre, link, activo, onItemClick }) => {
  return (
    <>
      <li class="nav-item">
        <Nav.Link
          name={nombre}
          as={Link}
          to={link}
          class="nav-link active"
          aria-current="page"
        >
          {nombre}
        </Nav.Link>
      </li>
    </>
  );
};

export default SidebarItem;
