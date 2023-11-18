import Header from "./Header";
import Menu from "../Menu";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/estilos.css";
import BackgroundLogin from "../../../../users/login/src/components/BackgroundLogin";

const Layout = ({ children, isFluid, haveFooter = true, haveMenu = true }) => {
  return (
    <>
      <BackgroundLogin />
      <Header />
      {haveMenu && <Menu />}
      <main>
        <article>
          <Container fluid={isFluid} className="mb-5">
            {children}
          </Container>
        </article>
      </main>
      {haveFooter && <Footer />}
    </>
  );
};

export default Layout;
