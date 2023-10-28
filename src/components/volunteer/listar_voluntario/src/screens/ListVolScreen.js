import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../AuthContext";
import Cookies from "universal-cookie";
import GeneralHeader from "../../../../generales/src/components/GeneralHeader";
import GeneralFooter from "../../../../generales/src/components/GeneralFooter";
import styled from "styled-components";
import VoluntarioList from "../components/VoluntarioList";
import instance from "../../../../../axios_instance";
import Menu from "../../../../generales/src/components/Menu";
import { useHistory } from "react-router-dom"; // Importa useHistory

const cookies = new Cookies();

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto; /* Ajuste de las filas */
  min-height: 100vh;
  width: 100%;
`;

const Header = styled(GeneralHeader)`
  grid-row: 1;
`;

const Menus = styled(Menu)`
  grid-row: 2;
`;

const Content = styled.div`
  grid-row: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 16px;
  margin-top: 16px;
`;

const Footer = styled(GeneralFooter)`
  grid-row: 4;
  width: 100%; /* Ocupa el ancho completo */
  flex-shrink: 0; /* No se encoje más allá de su contenido */
`;

const ListVolscreen = () => {
  const [voluntarioList, setVoluntarioList] = useState([]);
  const token = cookies.get("token");
  const history = useHistory(); // Obtén la función history

  useEffect(() => {
    const fetchVoluntario = async () => {
      try {
        const response = await instance.get("/volunteers/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setVoluntarioList(response.data);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      }
    };

    fetchVoluntario();
  }, [token]);

  return (
    <Container>
      <Header />
      <Menus />
      <Content>
        <VoluntarioList voluntarioList={voluntarioList} />
      </Content>
      <Footer />
    </Container>
  );
};

export default ListVolscreen;
