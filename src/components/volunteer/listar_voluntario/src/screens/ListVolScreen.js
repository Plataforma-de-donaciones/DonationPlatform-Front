import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import GeneralHeader from "../../../../generales/src/components/GeneralHeader";
import GeneralFooter from "../../../../generales/src/components/GeneralFooter";
import styled from "styled-components";
import VoluntarioList from "../components/VoluntarioList";
import instance from "../../../../../axios_instance";
import Menu from "../../../../generales/src/components/Menu";
import Layout from "../../../../generales/src/components/layout/Layout";
import { Row, Col, Card, CardBody } from "react-bootstrap";

const cookies = new Cookies();

const ListVolscreen = () => {
  const [voluntarioList, setVoluntarioList] = useState([]);
  const token = cookies.get("token");

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
    <Layout>
      <Row>
        <Col>
          <Card className='mt-5'>
            <CardBody>

              <VoluntarioList voluntarioList={voluntarioList} />

            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout >
  );
};

export default ListVolscreen;
