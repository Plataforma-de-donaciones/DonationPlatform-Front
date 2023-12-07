import React from "react";

import EventList from "../components/EventList";
import Layout from "../../../../generales/src/components/layout/Layout";
import { Card } from "react-bootstrap";

const ListEveScreen = () => {

  return (
    <>
      <Layout>
        <Card className='mt-5'>

          <EventList />

        </Card>
      </Layout>

    </>

  );
};

export default ListEveScreen;
