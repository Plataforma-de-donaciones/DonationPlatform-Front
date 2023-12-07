import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import DonationList from "../components/DonationList";
import instance from "../../../../../axios_instance";
import { useHistory } from "react-router-dom"; // Importa useHistory
import Layout from "../../../../generales/src/components/layout/Layout";
import { Card, CardBody } from "react-bootstrap";

const cookies = new Cookies();

const Listdonscreen = () => {
  const [donationList, setDonationList] = useState([]);
  const token = cookies.get("token");
  const history = useHistory(); // Obtén la función history

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await instance.get("/donations/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setDonationList(response.data);
      } catch (error) {
        console.error("Error fetching donation:", error);
      }
    };

    fetchDonation();
  }, [token]);

  return (
    <>
      <Layout>
            <DonationList donationList={donationList} />
      </Layout>
    </>
  );
};

export default Listdonscreen;
