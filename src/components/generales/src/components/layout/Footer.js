import styled from "styled-components"; // Importa styled-components
import GeneralFooter from "../../../../users/login/src/components/GeneralFooter";

const ComponentFooter = styled(GeneralFooter)`
  grid-row: 4; /* Coloca el footer en la tercera fila */
`;

const Footer = () => {
    return (
        <ComponentFooter />
    );
}

export default Footer;