import Header from "./Header";
import Menu from "../Menu";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/estilos.css'
const Layout = ({ children, isFluid }) => {
    return (
        <>
            <Header />
            <Menu />
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