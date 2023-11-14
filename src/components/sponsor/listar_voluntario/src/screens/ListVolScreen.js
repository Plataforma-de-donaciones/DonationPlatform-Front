import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../AuthContext";
import Cookies from "universal-cookie";
import GeneralHeader from "../../../../generales/src/components/GeneralHeader";
import GeneralFooter from "../../../../generales/src/components/GeneralFooter";
import styled from "styled-components";
import SponsorList from "../components/SponsorList";
import instance from "../../../../../axios_instance";
import Menu from "../../../../generales/src/components/Menu";
import { useHistory } from "react-router-dom"; // Importa useHistory
import Layout from "../../../../generales/src/components/layout/Layout";
import { Row, Col, Card, CardBody } from "react-bootstrap";

const cookies = new Cookies();

const ListSponsorscreen = () => {
  const [sponsorList, setSponsorList] = useState([]);
  const token = cookies.get("token");
  const history = useHistory();

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        const response = await instance.get("/sponsors/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setSponsorList(response.data);
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      }
    };

    fetchSponsor();
  }, [token]);

  return (
    <Layout>
      <Row>
        <Col>
          <Card className='mt-5'>
            <CardBody>
              <SponsorList sponsorList={sponsorList} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default ListSponsorscreen;
