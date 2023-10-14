import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../AuthContext";
import Cookies from "universal-cookie";
import GeneralHeader from "../../../inicio/src/components/GeneralHeader";
import GeneralFooter from "../../../inicio/src/components/GeneralFooter";
import styled from "styled-components";
import EquipamientoMedicoList from "../components/EquipamientoMedicoList";
import instance from "../../../../axios_instance";

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

const Content = styled.div`
  grid-row: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 16px;
  margin-top: 16px;
`;

const Footer = styled(GeneralFooter)`
  grid-row: 3;
  width: 100%; /* Ocupa el ancho completo */
  flex-shrink: 0; /* No se encoje más allá de su contenido */
`;

const Listeqscreen = () => {
  const [equipamientoList, setEquipamientoList] = useState([]);
  const token = cookies.get("token");

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
      <Content>
        <EquipamientoMedicoList equipamientoList={equipamientoList} />
      </Content>
      <Footer />
    </Container>
  );
};

export default Listeqscreen;
