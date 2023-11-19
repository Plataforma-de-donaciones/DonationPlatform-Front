import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import EquipamientoMedicoList from "../components/EquipamientoMedicoList";
import instance from "../../../../../axios_instance";
import { useHistory } from "react-router-dom";
import Layout from "../../../../generales/src/components/layout/Layout";
import { Card, CardBody } from "react-bootstrap";

const cookies = new Cookies();

const Listeqscreen = () => {
  const [equipamientoList, setEquipamientoList] = useState([]);
  const token = cookies.get("token");
  const history = useHistory(); // Obtén la función history

  useEffect(() => {
    const fetchEquipamiento = async () => {
      try {
        const response = await instance.get("/medicalequipments/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setEquipamientoList(response.data);
      } catch (error) {
        console.error("Error fetching equipamiento médico:", error);
      }
    };

    fetchEquipamiento();
  }, [token]);

  return (
    <>
      <Layout>
        <Card className='mt-5'>
          <CardBody>

            <EquipamientoMedicoList equipamientoList={equipamientoList} />

          </CardBody>
        </Card>
      </Layout>
    </>

  );
};

export default Listeqscreen;
