import React, { useEffect, useState } from "react";
import NewsCarousel from "../components/NewsCarousel";
import { useAuth } from "../../../../../AuthContext";
import Cookies from "universal-cookie";
import GeneralHeader from "../../../../generales/src/components/GeneralHeader";
import GeneralFooter from "../../../../generales/src/components/GeneralFooter";
import styled from "styled-components";
import NewsList from "../components/NewsList";
import MyCalendar from "../components/MyCalendar";
import Menu from "../../../../generales/src/components/Menu";
import instance from "../../../../../axios_instance";
import BackgroundLogin from "../components/BackgroundLogin"; // Importa BackgroundLogin


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

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  padding: 24px;
  margin-top: 16px;
  border-radius: 8px;

  @media (max-width: 1350px) {
    display: grid;
    grid-template-rows: auto auto 1fr auto; /* Ajuste de las filas */
  }
`;

const NewsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1; /* Ajuste de flex para ocupar el espacio disponible */

  @media (max-width: 1350px) {
    grid-row: 2;
  }
`;

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 6px;
  margin-left: 8px;
  margin-right: 8px;

  @media (max-width: 1350px) {
    grid-row: 1;
    margin-bottom: 20px;
  }
`;

const Footer = styled(GeneralFooter)`
  grid-row: 4;
`;

const HomeScreen = () => {
  const [newsList, setNewsList] = useState([]);
  const [events, setEvents] = useState([]);
  const token = cookies.get("token");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await instance.get("/news/", {});
        setNewsList(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await instance.get("/events/", {});
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchNews();
    fetchEvents();
  }, [token]);

  const highlightedNews = newsList.filter((news) => news.is_highlighted);

  return (
    <Container>
      <BackgroundLogin /> {/* Coloca BackgroundLogin antes que los otros componentes */}
      <Header />
      <Menus />
      <Content>
        <NewsCarousel newsList={highlightedNews} />
        <ContentContainer>
          <NewsListContainer>
            <NewsList newsList={newsList} />
          </NewsListContainer>
          <CalendarContainer>
            <MyCalendar events={events} />
          </CalendarContainer>
        </ContentContainer>
      </Content>
      <Footer />
    </Container>
  );
};

export default HomeScreen;
