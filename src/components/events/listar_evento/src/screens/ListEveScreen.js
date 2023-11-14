import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../AuthContext";
import Cookies from "universal-cookie";
import GeneralHeader from "../../../../generales/src/components/GeneralHeader";
import GeneralFooter from "../../../../generales/src/components/GeneralFooter";
import styled from "styled-components";
import EventList from "../components/EventList";
import instance from "../../../../../axios_instance";
import Menu from "../../../../generales/src/components/Menu";
import { useHistory } from "react-router-dom";
import MyCalendar from "../components/MyCalendar";

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
const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 16px;
  margin-top: 16px;
  flex: 1; /* Ocupa el espacio disponible verticalmente */
`;
const EventListContainer = styled.div`
  margin-top: 16px;
  margin-right: 10px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1; 
`;

const CalendarContainer = styled.div`
  margin-top: 24px;
  flex: 1; 
`;

const Footer = styled(GeneralFooter)`
  grid-row: 4;
  width: 100%; /* Ocupa el ancho completo */
  flex-shrink: 0; /* No se encoje más allá de su contenido */
`;

const ListEveScreen = () => {
  const [eventList, setEventList] = useState([]);
  const token = cookies.get("token");
  const history = useHistory();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await instance.get("/events/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setEventList(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvent();
  }, [token]);

  return (
    <Container>
      <Header />
      <Menus />
      <Content>
      <ContentContainer>
          <EventListContainer>
            <EventList eventList={eventList} />
          </EventListContainer>
          <CalendarContainer>
            <MyCalendar eventList={eventList} />
          </CalendarContainer>
      </ContentContainer>
        </Content>
      <Footer />
    </Container>
  );
};

export default ListEveScreen;
