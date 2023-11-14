import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../AuthContext";
import Cookies from "universal-cookie";
import GeneralHeader from "../../../../generales/src/components/GeneralHeader";
import GeneralFooter from "../../../../generales/src/components/GeneralFooter";
import styled from "styled-components";
import EquipamientoMedicoList from "../components/EquipamientoMedicoList";
import instance from "../../../../../axios_instance";
import Menu from "../../../../generales/src/components/Menu";
import { useHistory } from "react-router-dom"; // Importa useHistory

const cookies = new Cookies();

const Container = styled.div`
  @media (min-width: 1px) {
    display: grid;
    grid-template-rows: auto auto 1fr auto; /* Ajuste de las filas */
    padding-top: 130px;
    padding-bottom: 50px;
    min-height: 100vh;
    width: 100%;
  }
`;

const Header = styled(GeneralHeader)`
  grid-row: 1;
`;

const Menus = styled(Menu)`
  grid-row: 2;
`;

const Content = styled.div`
@media (min-width: 1px) {
  grid-row: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 32px;
  margin-top: 0px;
  position: relative; /* Agrega esta propiedad */
  z-index: 0; /* Asegura que esté detrás de otros elementos */
}
`;

const Footer = styled(GeneralFooter)`
  grid-row: 4;
  width: 100%; /* Ocupa el ancho completo */
  flex-shrink: 0; /* No se encoje más allá de su contenido */
`;

const Listeqscreen = () => {
  const [equipamientoList, setEquipamientoList] = useState([]);
  const token = cookies.get("token");
  const history = useHistory(); // Obtén la función history

  useEffect(() => {
    const fetchEquipamiento = async () => {
      try {
        const response = await instance.get("/medicalequipments/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setEquipamientoList(response.data);
      } catch (error) {
        console.error("Error fetching equipamiento médico:", error);
      }
    };

    fetchEquipamiento();
  }, [token]);

  return (
    <Container>
      <Header />
      <Menus />
      <Content>
        <EquipamientoMedicoList equipamientoList={equipamientoList} />
      </Content>
      <Footer />
    </Container>
  );
};

export default Listeqscreen;
