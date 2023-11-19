import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import NewsList from "../components/NewsList";
import MyCalendar from "../components/MyCalendar";
import instance from "../../../../../axios_instance";
import CarouselNews from "../components/CarouselNews";
import Layout from "../../../../generales/src/components/layout/Layout";
import { Col, Row } from "react-bootstrap";

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
