// HomeScreen.js
import React, { useEffect, useState } from "react";
//import axios from "axios";
import NewsCarousel from "../components/NewsCarousel";
import { useAuth } from "../../../../AuthContext";
import Cookies from "universal-cookie";
import GeneralFooter from "../components/GeneralFooter";
import GeneralHeader from "../components/GeneralHeader";
import styled from "styled-components";
import NewsList from "../components/NewsList";
import MyCalendar from "../components/MyCalendar";
import Menu from "./GeneralMenu";
import instance from "../../../../axios_instance";

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

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 16px;
  margin-top: 16px;
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
        const response = await instance.get("/news/", {
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
        const response = await instance.get("/events/", {
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
      <Menu />
      <ContentContainer>
        <NewsList newsList={newsList} />
        <MyCalendar events={events} />
      </ContentContainer>

      <Footer />
    </Container>
  );
};

export default HomeScreen;
