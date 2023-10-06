// HomeScreen.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCarousel from "../components/NewsCarousel";
import { useAuth } from "../../../../AuthContext";
import Cookies from "universal-cookie";
import GeneralFooter from "../components/GeneralFooter";
import GeneralHeader from "../components/GeneralHeader";
import styled from "styled-components";
import NewsList from "../components/NewsList";
import MyCalendar from "../components/MyCalendar"; // Importa el nuevo componente

const cookies = new Cookies();
const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
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

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que los elementos se envuelvan a la siguiente línea si no caben en el ancho disponible */
  justify-content: space-around; /* Distribuye los elementos uniformemente en el contenedor */
  background-color: rgba(255, 255, 255, 0.8);
  padding: 16px;
  margin-top: 16px;
`;
const NewsListContainer = styled.div`
  margin-top: 16px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarContainer = styled.div`
  margin-top: 24px;
`;

const Footer = styled(GeneralFooter)`
  grid-row: 3;
`;

const HomeScreen = () => {
  const [newsList, setNewsList] = useState([]);
  const [events, setEvents] = useState([]);
  const token = cookies.get("token");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://192.168.1.14/news/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setNewsList(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://192.168.1.14/events/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchNews();
    fetchEvents();
  }, [token]);

  // Filtrar las noticias destacadas
  const highlightedNews = newsList.filter((news) => news.is_highlighted);

  return (
    <Container>
      <Header />

      <Content>
        <NewsCarousel newsList={highlightedNews} />
        <ContentContainer>
          <NewsListContainer>
            <NewsList newsList={newsList} />
          </NewsListContainer>
          <CalendarContainer>
            {/* Usar el nuevo componente de calendario */}
            <MyCalendar events={events} />
          </CalendarContainer>
        </ContentContainer>
      </Content>

      <Footer />
    </Container>
  );
};

export default HomeScreen;
