import Header from "./Header";
import Menu from "../Menu";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/estilos.css";
import BackgroundLogin from "../../../../users/login/src/components/BackgroundLogin";
import MenuComponent from "../../../../administrator/list_users/components/MenuComponent";
import Sidebar from "../sidebar/Sidebar";
import SidebarModerator from './../sidebar/SidebarModerator';

const Layout = ({
  children,
  isFluid,
  haveFooter = true,
  haveMenu = true,
  isAdmin,
  sidebar,
  isModerator
}) => {
  const claseSidebar = sidebar ? "d-flex flex-shrink-0 p-3 " : "";
  const fullArticle = sidebar ? { width: "100%" } : {};
  return (
    <>
      <BackgroundLogin />
      <Header />
      {haveMenu && <Menu />}
      <main className={claseSidebar}>
        {sidebar && !isModerator &&  <Sidebar />}
        {sidebar && isModerator && <SidebarModerator />}

        <article style={fullArticle}>
          {isAdmin && <MenuComponent className="" />}

          <Container fluid={isFluid}>{children}</Container>
        </article>
      </main>
      {haveFooter && <Footer />}
    </>
  );
};

export default Layout;
