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
import CarouselNews from "../components/CarouselNews";
import Layout from "../../../../generales/src/components/layout/Layout";
import { Card, Col, Row } from "react-bootstrap";

const cookies = new Cookies();
const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr auto; /* Ajuste de las filas */
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

const NewsListContainer = styled.div`
  margin-top: 16px;
  margin-right: 10px; /* Ajuste de márgenes para pantalla más pequeña */
  margin-left: 10px; /* Ajuste de márgenes para pantalla más pequeña */
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1; /* Ajuste de flex para ocupar el espacio disponible */
`;

const CalendarContainer = styled.div`
  margin-top: 24px;
`;

const Footer = styled(GeneralFooter)`
  grid-row: 4;
  width: 100%; /* Ocupa el ancho completo */
  flex-shrink: 0; /* No se encoje más allá de su contenido */
`;

const HomeScreen = () => {
  const [newsList, setNewsList] = useState([]);
  const [events, setEvents] = useState([]);
  const token = cookies.get("token");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await instance.get("/news/", {});
        console.log(response.data);
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
    <Layout>
      <CarouselNews news={highlightedNews}></CarouselNews>

        <Row className="mt-3 mx-auto">
     
          <Col className="col-xl-8 col-sm-12 order-sm-2 order-xl-1 order-1">
            <NewsList newsList={newsList} />
          </Col>

          <Col className="col-xl-4 col-sm-12 order-sm-1  mb-3">
            <MyCalendar events={events} isHome={true} />
          </Col>
     
        </Row>
    </Layout>
  );
};

export default HomeScreen;
