import SidebarItem from "./SidebarItem";
import { useState } from "react";

const SidebarModerator = () => {
  const [activeItem, setActiveItem] = useState("");

  return (
    <>
      <aside className="flex-column p-3 text-white sidebar-admin">
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span class="fs-4 mx-auto">Moderador</span>
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <SidebarItem nombre="Noticias" link={"/listadonoticiasmod"} />
          <SidebarItem nombre="Contenido moderado" link={"/listadoocultos"} />
        </ul>
      </aside>
    </>
  );
};

export default SidebarModerator;
