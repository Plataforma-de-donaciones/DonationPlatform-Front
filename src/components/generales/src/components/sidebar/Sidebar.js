import SidebarItem from "./SidebarItem";
import { useState } from "react";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");

  return (
    <>
      <aside className="flex-column p-3 text-white sidebar-admin">
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span class="fs-4 mx-auto">Administración</span>
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <SidebarItem nombre="Contenido" link={"/listadonoticias"} />
          <SidebarItem
            nombre="Administradores"
            link={"/listadoadministradores"}
          />
          <SidebarItem nombre="Moderadores" link={"/listadomoderadores"} />
          <SidebarItem nombre="Usuarios" link={"/listadousuarios"} />
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
