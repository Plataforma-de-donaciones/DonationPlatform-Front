import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import NewsList from "../components/NewsList";
import MyCalendar from "../components/MyCalendar";
import instance from "../../../../../axios_instance";
import CarouselNews from "../components/CarouselNews";
import Layout from "../../../../generales/src/components/layout/Layout";
import { Col, Row } from "react-bootstrap";
import Chatbot from "../../../../chatbot/Chatbot";
import { Card, CardBody } from "react-bootstrap";
import styled from "styled-components"; // Importa styled-components

const cookies = new Cookies();

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
      <NoticiasListContainer>
        <ListAndCalendarContainer>
          <ListContainer>
            <Row>
            <Col className="col-xl-4 col-sm-12 order-sm-1  mb-3">
                <MyCalendar events={events} isHome={true} />
              </Col>
              <Col className="col-xl-8 col-sm-12 order-sm-2 order-xl-1 order-1">
                  <NewsList newsList={newsList} />
              </Col>
            </Row>  
          </ListContainer>
        </ListAndCalendarContainer>
      </NoticiasListContainer>
    </Layout>
  );
};

const NoticiasListContainer = styled.div`
  display: flex;
  flex-direction : column;

  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  padding: 32px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-radius: 8px;

  @media (max-width: 1350px) {
    display: grid;
    grid-template-rows: auto auto 1fr auto; /* Ajuste de las filas */
  }
  @media (min-width: 1px) {
    display: grid;
    grid-template-rows: auto auto 1fr auto; /* Ajuste de las filas */
    width: 100%;
  }
`;

const ListAndCalendarContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 16px;
`;

export default HomeScreen;
