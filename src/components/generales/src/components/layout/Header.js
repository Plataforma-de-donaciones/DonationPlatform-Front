import GeneralHeader from "../GeneralHeader";
import styled from "styled-components"; // Importa styled-components


const HeaderComponent = styled(GeneralHeader)`
  grid-row: 1; /* Coloca el header en la primera fila */
`;

const Header = () => {
    return (
        <HeaderComponent />
    )
}

export default Header;
