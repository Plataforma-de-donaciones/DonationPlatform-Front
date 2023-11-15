import Header from "./Header";
import Menu from "../Menu";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/estilos.css'
import BackgroundLogin from "../../../../users/login/src/components/BackgroundLogin";

const Layout = ({ children, isFluid, haveMenu = true }) => {
    return (
        <>
            <BackgroundLogin />
            <Header />
            {haveMenu && <Menu />}
            <main>

                <Container fluid={isFluid} className="mb-5">
                    {children}
                </Container>

            </main>
            <Footer />
        </>
    )
}

export default Layout;